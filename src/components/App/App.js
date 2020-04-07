import React from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css/normalize.css";
import classes from "./App.module.css";
import "pokemon-font/css/pokemon-font.css";
import MainWrapper from "../../containers/MainWrapper/MainWrapper";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <div className={classes.wrapper}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <MainWrapper />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
