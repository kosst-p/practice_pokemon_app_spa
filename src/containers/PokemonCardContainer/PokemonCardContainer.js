import React, { useEffect, useState } from "react";
import classes from "./PokemonCardContainer.module.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Loader from "../../components/Loader/Loader";

const PokemonCardContainer = (props) => {
  /* States */
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
  });
  /* ****** */

  /* Logic */
  const getCurrentScrollPositionByClick = (e) => {
    let cordsAfterClick = {};
    let cords = ["scrollX", "scrollY"];
    cords.forEach((cord) => {
      cordsAfterClick[cord] = window[cord];
    });
    localStorage.setItem("scrollCords", JSON.stringify(cordsAfterClick));
  };

  useEffect(() => {
    setScrollPosition((prevScrollPosition) => {
      return {
        ...prevScrollPosition,
        ...JSON.parse(window.localStorage.getItem("scrollCords")),
      };
    });
    window.scrollTo(scrollPosition.scrollX, scrollPosition.scrollY);
  }, [scrollPosition.scrollX, scrollPosition.scrollY]);

  const mappedPokemons = props.pokemons.map((pokemon, index) => (
    <PokemonCard
      getCurrentScrollPositionByClick={getCurrentScrollPositionByClick}
      key={index}
      pokemonName={pokemon.name}
      pokemonURL={pokemon.url}
      loading={props.loading}
      forwardRef={
        props.pokemons.length === index + 1 ? props.lastPokemonElementRef : null
      }
    />
  ));
  /* ******* */

  /* Render */
  return (
    <>
      <div className={classes.Title}>
        <h1>Who is that Pokemon?</h1>
      </div>
      <div className=" d-flex justify-content-center">
        {props.error ? (
          <h1 className={classes.ErrorConnect}>Could not connect to server</h1>
        ) : props.loading ? (
          <Loader />
        ) : null}
      </div>
      {mappedPokemons}
    </>
  );
  /* ***** */
};

export default PokemonCardContainer;
