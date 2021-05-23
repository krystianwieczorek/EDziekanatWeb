import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

export default function Loader() {
  return (
    <Grid
      container
      direction="column-reverse"
      justify="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      <CircularProgress disableShrink />
    </Grid>
  );
}
