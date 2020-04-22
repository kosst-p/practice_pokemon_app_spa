import React, { useEffect, useState } from "react";
import classes from "./Evolution.module.css";
import Axios from "axios";

const Evolution = (props) => {
  const evolutionURL = props.evolution;
  const [evolutionChain, setEvolutionChain] = useState([
    [
      {
        name: "",
        url: "",
      },
    ],
    [
      {
        name: "",
        url: "",
      },
      {
        name: "",
        url: "",
      },
    ][
      {
        name: "",
        url: "",
      }
    ],
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await Axios({
        method: "GET",
        url: evolutionURL,
      }).then((result) => {
        console.log("--------------");
        console.log("массив для обхода - ", result.data.chain);
        console.log("--------------");

        let resultUPD = [];
        resultUPD.push([result.data.chain.species]);
        const getEvolves = (object) => {
          if (Array.isArray(object.evolves_to) && !object.evolves_to.length) {
            return object.evolves_to;
          }
          const resultNew = object.evolves_to.map((evolves) =>
            getEvolves(evolves)
          );
          return [...object.evolves_to, ...resultNew].flat();
        };
        getEvolves(result.data.chain).map((elem) =>
          resultUPD.push([elem.species])
        );
        console.log("result", resultUPD);
      });
    };
    fetchData();
  }, [evolutionURL]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Coming soon</h1>
    </div>
  );
};

export default Evolution;
