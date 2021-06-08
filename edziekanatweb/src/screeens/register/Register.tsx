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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import React, { useCallback, useEffect, useState } from "react";
import { getDepartments } from "../../api/deanClient";
import { registerRequest } from "../../api/authClient";
import Loader from "../../components/Loader";

const Register = () => {
  const classes = RegisterStyles();
  const history = useHistory();
  const [deparmentsData, setDeparmentsData] = useState<any>([]);
  const [deanOffice, setDeanOfiice] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const { register, handleSubmit, watch, control } = useForm();

  const onClick = useCallback(
    (data: any) => {
      setIsLoading(true);
      console.log(isLoading);
      setTimeout(() => {
        try {
          registerRequest(data).then((response) => {
            if (response.status === 200) {
              history.push("/login");
            }
          });
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      }, 2000);
    },
    [isLoading, history]
  );

  useEffect(() => {
    getDepartments().then((response) => {
      setDeparmentsData(response.data);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs" datatest-id="test">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onClick)}>
              <Controller
                name="email"
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
                name="login"
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
                    id="login"
                    label="Login"
                    name="login"
                    autoComplete="login"
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "valid login required",
                }}
              />
              <Controller
                name="firstName"
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
                    type="password"
                    name="password"
                    autoComplete="password"
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  required: "Password is required",
                }}
              />
              <Controller
                name="Department"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="Department">Department</InputLabel>
                    <Select
                      error={!!error}
                      labelId="Department"
                      id="Department"
                      value={value}
                      onChange={onChange}
                      label="Department"
                    >
                      {deparmentsData.map((item: any, key: any) => (
                        <MenuItem
                          onClick={() => setDeanOfiice(item.deansOffices)}
                          value={item.id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                rules={{
                  required: "Department is required",
                }}
              />
              <Controller
                name="deansOfficeId"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="DeanOffice">Dean Office</InputLabel>
                    <Select
                      error={!!error}
                      labelId="DeanOffice"
                      id="DeanOffice"
                      value={value}
                      onChange={onChange}
                      label="DeanOffice"
                      defaultValue={"Ten"}
                    >
                      {deanOffice.map((item: any, key: any) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                rules={{
                  required: "Dean Office is required",
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
      )}
    </>
  );
};
export default Register;
