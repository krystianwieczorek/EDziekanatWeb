import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { LoginStyles } from "./LoginStyles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { loggInAction } from "../../store/actions/logInAction";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { loginRequest } from "../../api/authClient";
import { useCallback, useState } from "react";
import Loader from "../../components/Loader";

const Login = () => {
  const classes = LoginStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, control } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>();

  const dispatch = useDispatch();

  const onClick = useCallback(
    (data: any) => {
      setIsLoading(true);
      setTimeout(() => {
        try {
          loginRequest(data).then((response: any) => {
            console.log(response.data.user);
            dispatch(loggInAction(response.data.user));
            if (response.status === 200) {
              history.push("/");
            }
          });
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    },
    [history, dispatch]
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onClick)}>
              <Controller
                name="userNameOrEmail"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    error={!!error}
                    variant="outlined"
                    margin="normal"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    id="userNameOrEmail"
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
                name="password"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                rules={{ required: "password required" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};
export default Login;
