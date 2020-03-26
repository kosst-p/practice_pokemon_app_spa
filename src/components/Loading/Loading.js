import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="row">
      <div
        className={`${classes.Loading} col-12 d-flex justify-content-center`}
      >
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default Loading;
