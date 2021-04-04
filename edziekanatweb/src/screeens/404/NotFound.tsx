import React from "react";
import { NotFoundStyles } from "./NotFoundStyles";

const NotFound = () => {
  const classes = NotFoundStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.text}>Not Found</h1>
      <h1>404</h1>
    </div>
  );
};

export default NotFound;
