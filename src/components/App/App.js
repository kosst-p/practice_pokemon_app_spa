import React from "react";
import PokemonCardContainer from "../../containers/PokemonCardContainer/PokemonCardContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css/normalize.css";
import classes from "./App.module.css";
import "pokemon-font/css/pokemon-font.css";
import Pokemon from "../Pokemon/Pokemon";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div className={classes.wrapper}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Switch>
                  <Route exact path="/" component={PokemonCardContainer} />
                  <Route
                    exact
                    path="/pokemon/:pokemonName"
                    component={Pokemon}
                  />
                  <Route
                    render={() => (
                      <h1 className={classes.notFound}> Not Found</h1>
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
