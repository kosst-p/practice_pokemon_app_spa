import React from "react";
import classes from "./PokemonSearchBox.module.css";

const PokemonSearchBox = props => {
  return (
    <div
      className={`${classes.PokemonSearchBox} d-flex justify-content-center`}
    >
      <input
        type="text"
        placeholder="Pokemon search"
        value={props.value}
        onChange={props.handleSearch}
      />
    </div>
  );
};

export default PokemonSearchBox;
