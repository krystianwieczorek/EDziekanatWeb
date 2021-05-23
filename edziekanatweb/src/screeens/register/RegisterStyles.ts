import { makeStyles } from "@material-ui/core/styles";

export const RegisterStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  formControl: {
    margin: theme.spacing(3, 0, 2),

    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
