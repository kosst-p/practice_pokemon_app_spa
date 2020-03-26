import React from "react";
import classes from "./PokemonCard.module.css";

const PokemonCard = props => {
  const pokemonNumber = props.pokemonURL.split("/")[
    props.pokemonURL.split("/").length - 2
  ];
  const pokemonIMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  const pokemonName =
    props.pokemonName.charAt(0).toUpperCase() + props.pokemonName.substring(1);
  return (
    <div className={`${classes.PokemonCard} row`}>
      <div className="col-12 justify-content-between d-flex align-items-center flex-column flex-md-row">
        <div>{pokemonNumber}.&nbsp;</div>
        <div className={classes.test}>{pokemonName}</div>
        <div>
          <img src={pokemonIMG} alt={pokemonName} />
        </div>
        <div>
          <button>{pokemonName}, I Choose You!</button>
        </div>
      </div>
    </div>
  );
};
export default PokemonCard;
