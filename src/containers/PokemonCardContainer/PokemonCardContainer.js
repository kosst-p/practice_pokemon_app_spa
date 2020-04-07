import React, { useEffect, useState } from "react";
import classes from "./PokemonCardContainer.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Loader from "../../components/Loader/Loader";
import PokemonSearchBox from "../../components/PokemonSearchBox/PokemonSearchBox";
// import logger from "react-logger";

const PokemonCardContainer = (props) => {
  const [scrolls, setScrolls] = useState([0, 0]);

  const getScrollPosition = () => {
    let cordsAfterClick = [];
    let cords = ["scrollX", "scrollY"];
    cords.forEach((cord) => {
      cordsAfterClick.push(window[cord]);
    });
    console.log(cordsAfterClick);
    setScrolls(cordsAfterClick);
    console.log(scrolls);
  };

  const mappedPokemons = props.pokemons.map((pokemon, index) => (
    <PokemonCard
      getScrollPosition={getScrollPosition}
      key={index}
      pokemonName={pokemon.name}
      pokemonURL={pokemon.url}
      loading={props.loading}
      forwardRef={
        props.pokemons.length === index + 1 ? props.lastPokemonElementRef : null
      }
    />
  ));

  /*****/
  //useEffect(() => getScrollPosition, [getScrollPosition]);
  // useEffect(() => {
  //   window.scroll(scrolls[0], scrolls[1]);
  //   let isMounted = true;
  //   const fetchData = () => {
  //     let cords = ["scrollX", "scrollY"];
  //     window.addEventListener("click", (e) => {
  //       let res = [];
  //       cords.forEach((cord) => {
  //         res.push(window[cord]);
  //       });
  //       if (isMounted) {
  //         setScrolls(() => {
  //           return res;
  //         });
  //       }
  //     });
  //   };
  //   fetchData();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [scrolls]);
  //console.log(scrolls);
  /*****/

  return (
    <>
      <PokemonSearchBox
        value={props.search}
        handleSearch={props.handleSearch}
      />
      <div className=" d-flex justify-content-center">
        {props.error ? (
          <h1 className={classes.ErrorConnect}>Could not connect to server</h1>
        ) : props.loading ? (
          <Loader />
        ) : null}
      </div>
      {/* {mappedPokemons.length ? mappedPokemons : null*/}
      {mappedPokemons}
    </>
  );
};

export default PokemonCardContainer;
