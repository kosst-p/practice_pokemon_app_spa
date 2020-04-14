import React from "react";
import classes from "./PokemonCard.module.css";
import { Link } from "react-router-dom";

const PokemonCard = (props) => {
  /* States */
  const pokemonNumber = props.pokemonURL.split("/")[
    props.pokemonURL.split("/").length - 2
  ];
  const pokemonIMG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`;
  const pokemonName =
    props.pokemonName.charAt(0).toUpperCase() + props.pokemonName.substring(1);
  /* ****** */

  /* Render */
  return (
    <div ref={props.forwardRef} className={`${classes.PokemonCard}`}>
      <div className="justify-content-between d-flex align-items-center flex-column flex-md-row">
        <div>{pokemonNumber}.&nbsp;</div>
        <div className={classes.test}>{pokemonName}</div>
        <div>
          <img src={pokemonIMG} alt={pokemonName} />
        </div>
        <Link
          onClick={props.getCurrentScrollPositionByClick}
          className={classes.Button}
          to={`pokemon/${pokemonName ? pokemonName : null}`}
        >
          {pokemonName}, I Choose You!
        </Link>
      </div>
    </div>
  );
  /* ***** */
};

export default PokemonCard;
