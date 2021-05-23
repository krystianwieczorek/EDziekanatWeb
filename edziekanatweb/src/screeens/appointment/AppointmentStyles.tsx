import { makeStyles } from "@material-ui/core/styles";

export const AppointmentStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listContainer: {
    overflow: "auto",
    height: 300,
  },
}));
