import React from "react";
import PokemonCardContainer from "../../containers/PokemonCardContainer/PokemonCardContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css/normalize.css";
import classes from "./App.module.css";
import "pokemon-font/css/pokemon-font.css";

function App() {
  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <PokemonCardContainer />
      </div>
    </React.Fragment>
  );
}

export default App;
