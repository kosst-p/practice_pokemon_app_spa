import React from "react";
import classes from "./PokemonSearchBox.module.css";

const PokemonSearchBox = props => {
  return (
    <div className="row">
      <div className="col-12 d-flex justify-content-center">
        <input
          className={classes.PokemonSearchBox}
          type="text"
          placeholder="Pokemon search"
          value={props.value}
          onChange={props.handleSearch}
        />
      </div>
    </div>
  );
};

export default PokemonSearchBox;
