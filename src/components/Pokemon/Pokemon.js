import React, { useEffect, useState } from "react";
import classes from "./Pokemon.module.css";
import Axios from "axios";
import Evolution from "../Evolution/Evolution";

const Pokemon = (props) => {
  const [showEvolution, setShowEvolution] = useState(false);
  const [pokemon, setPokemon] = useState({
    img: "",
    name: "",
    weight: "",
    height: "",
    description: "",
    genus: "",
    types: [],
    abilities: [],
    moveList: [],
    eggGroups: [],
    stats: [],
    chanceToCatch: "",
    evolutionURL: "",
  });

  const pokemonNameForAPI = props.match.params.pokemonName.toLowerCase();
  const urlPokemonAPI = `https://pokeapi.co/api/v2/pokemon/${pokemonNameForAPI}/`;
  const urlPokemonSpeciesAPI = `https://pokeapi.co/api/v2/pokemon-species/${pokemonNameForAPI}/`;

  const handleGoToHomePage = () => {
    props.history.push({
      pathname: "/",
    });
  };
  const handleShowEvolution = () => {
    setShowEvolution(!showEvolution);
    console.log(showEvolution);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const resultPokemonAPI = await Axios.get(urlPokemonAPI);
        const dataPokemonAPI = resultPokemonAPI.data;
        const resultPokemonSpeciesAPI = await Axios.get(urlPokemonSpeciesAPI);
        const dataPokemonSpeciesAPI = resultPokemonSpeciesAPI.data;
        // console.log(
        //   "dataPokemonAPI: ",
        //   dataPokemonAPI,
        //   "dataPokemonSpeciesAPI: ",
        //   dataPokemonSpeciesAPI
        // );

        /* Pokemon Information */
        const img = dataPokemonAPI.sprites.front_default;
        const name =
          dataPokemonAPI.name.charAt(0).toUpperCase() +
          dataPokemonAPI.name.substring(1);
        const weight = Math.round(dataPokemonAPI.weight / 10); // hectograms->kilogram
        const height = dataPokemonAPI.height / 10; // decimeters->meters
        function getDescription(data) {
          let result = "";
          data.flavor_text_entries.forEach((flavor) => {
            if (flavor.language.name === "en") {
              result = flavor.flavor_text;
            }
          });
          return result;
        }
        const description = getDescription(dataPokemonSpeciesAPI);
        function getGenus(data) {
          let result = "";
          data.genera.forEach((genera) => {
            if (genera.language.name === "en") {
              result = genera.genus;
            }
          });
          return result;
        }
        const genus = getGenus(dataPokemonSpeciesAPI);
        const types = dataPokemonAPI.types.map(
          (type) =>
            type.type.name.charAt(0).toUpperCase() + type.type.name.substring(1)
        );
        const abilities = dataPokemonAPI.abilities.map(
          (ability) =>
            ability.ability.name.charAt(0).toUpperCase() +
            ability.ability.name.substring(1)
        );
        const moveList = dataPokemonAPI.moves.map((move) => move.move.name);
        function getStats(data) {
          const result = [];
          data.stats.map((stat) => {
            result.push({ name: stat.stat.name, value: stat.base_stat });
          });
          return result;
        }
        const stats = getStats(dataPokemonAPI);
        const eggGroups = dataPokemonSpeciesAPI.egg_groups.map(
          (egg_group) =>
            egg_group.name.charAt(0).toUpperCase() + egg_group.name.substring(1)
        );
        const chanceToCatch = Math.round(
          (dataPokemonSpeciesAPI.capture_rate * 100) / 255 // 255/100=dataPokemonSpeciesAPI.capture_rate/x
        );
        const evolutionURL = dataPokemonSpeciesAPI.evolution_chain.url;
        /* ****** */

        /* update State */
        if (isMounted) {
          setPokemon((prev) => {
            return {
              ...prev,
              img: img,
              name: name,
              weight: weight,
              height: height,
              description: description,
              genus: genus,
              types: types,
              abilities: abilities,
              moveList: moveList,
              eggGroups: eggGroups,
              stats: stats,
              chanceToCatch: chanceToCatch,
              evolutionURL: evolutionURL,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [urlPokemonAPI, urlPokemonSpeciesAPI]);
  console.log(pokemon);

  return (
    <div className={classes.MainWrapper}>
      <div className={classes.ProfileWrapper}>
        <div className="row d-flex justify-content-between align-content-center align-items-center">
          <div className="col-xl-3">
            <div className={classes.PokemonImg}>
              <img src={pokemon.img} alt={pokemon.name} />
            </div>
          </div>
          <div className="col-xl-9">
            <div className="d-flex flex-column align-self-center">
              <div className={classes.TitleProfile}>
                <h3>Profile</h3>
              </div>
              <div className={classes.PokemonName}>
                <p>
                  <strong>Name:</strong> {pokemon.name}{" "}
                </p>
              </div>
              <div className={classes.PokemonDescr}>
                <p>
                  <strong>Description:</strong> {pokemon.description}
                </p>
              </div>
              <div className={classes.PokemonTypes}>
                <p>
                  <strong>Type:</strong> &nbsp;
                  {pokemon.types.map((type, index) => {
                    return (
                      <span
                        key={index}
                        className={`${classes.PokemonType} ${classes[type]}`}
                      >
                        {type}
                      </span>
                    );
                  })}
                </p>
              </div>
              <div className={classes.PokemonAbil}>
                <p>
                  <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
                </p>
              </div>
              <div>
                <p>
                  <strong>Egg Group:</strong> {pokemon.eggGroups.join(", ")}
                </p>
              </div>
              <div>
                <p>
                  <strong>Weight:</strong> {pokemon.weight}, kg
                </p>
              </div>
              <div>
                <p>
                  <strong>Height:</strong> {pokemon.height}, m
                </p>
              </div>
              <div>
                <p>
                  <strong>Genus:</strong> {pokemon.genus}
                </p>
              </div>
              <div>
                <p>
                  <strong>Chance to Catch:</strong> {pokemon.chanceToCatch}, %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.StatsWrapper}>
        <div className="row">
          <div className="col-12">
            <div className={classes.TitleStats}>
              <h3>Stats</h3>
              {pokemon.stats.map((statData, index) => {
                return (
                  <div key={index} className="row align-items-center">
                    <div className="col-12 col-xl-3">{statData.name}</div>
                    <div className="col-12 col-xl-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${statData.value}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{statData.value}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.BtnWrapper}>
        <div className="row">
          <div className="col-12">
            <button onClick={handleShowEvolution}>Evolution</button>
            <button onClick={handleGoToHomePage}>Back</button>
          </div>
        </div>
      </div>
      <div className={classes.EvolvWrapper}>
        <div className="row">
          <div className="col-12">
            {showEvolution ? (
              <Evolution evolution={pokemon.evolutionURL} />
            ) : null}
          </div>
        </div>
      </div>
      <div className={classes.MovesListWrapper}>
        <div className="row">
          <div className="col-12">
            <div className={`d-flex flex-wrap ${classes.MovesListContent}`}>
              <h3>Moves list</h3>
              {pokemon.moveList.map((move, index) => {
                return <span key={index}>{move} </span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
