import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { RegisterStyles } from "./RegisterStyles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { loggInAction } from "../../store/actions/logInAction";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";

const Register = () => {
  const classes = RegisterStyles();
  const history = useHistory();

  const { register, handleSubmit, watch, control } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                variant="outlined"
                margin="normal"
                value={value}
                onChange={onChange}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "valid email required",
              pattern: /^\S+@\S+\.\S+$/,
            }}
          />
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                variant="outlined"
                margin="normal"
                value={value}
                onChange={onChange}
                fullWidth
                id="firstName"
                label="Firstname"
                name="firstName"
                autoComplete="firstName"
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "firstname required",
            }}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                variant="outlined"
                margin="normal"
                value={value}
                onChange={onChange}
                fullWidth
                id="emlastNameail"
                label="Lastname"
                name="lastName"
                autoComplete="lastName"
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "lastname is required",
            }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                error={!!error}
                variant="outlined"
                margin="normal"
                value={value}
                onChange={onChange}
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Password is required",
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
          >
            Sign up
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Register;
