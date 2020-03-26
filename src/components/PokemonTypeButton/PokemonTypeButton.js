import React from "react";
import classes from "./PokemonTypeButton.module.css";

const PokemonTypeButton = props => {
  return (
    <div className={classes.PokemonTypeButton} data-type={props.type}>
      <button type="button">{props.label}</button>
    </div>
  );
};
export default PokemonTypeButton;
