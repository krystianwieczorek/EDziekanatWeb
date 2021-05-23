import { useEffect } from "react";
import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotFound from "../screeens/404/NotFound";
import MailIcon from "@material-ui/icons/Mail";
import { LayoutStyles } from "./LayoutStyles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import logo from "./logo.png";
import { Button, Grid } from "@material-ui/core";
import Login from "../screeens/login/Login";
import Register from "../screeens/register/Register";
import Home from "../screeens/home/Home";
import AppointmentSummary from "../screeens/appointment/AppointmentSummary";
import Messenger from "../screeens/messenger/Messenger";
import Appointment from "../screeens/appointment/Appointment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { useHistory } from "react-router-dom";
import { loggedInSelector } from "../store/selectors/authSelector";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../store/actions/logOutAction";

export default function Layout() {
  const classes = LayoutStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const isAuthUser = useSelector(loggedInSelector);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {isAuthUser ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <a href="/" className={classes.link}>
                <Typography className={classes.tittle}>E-Dziekanat</Typography>
              </a>
            </Grid>
            <Grid item>
              {isAuthUser ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    dispatch(logOutAction());
                    localStorage.clear();
                  }}
                >
                  Logut
                </Button>
              ) : (
                <a href="/login" className={classes.link}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Login
                  </Button>
                </a>
              )}
              {isAuthUser ? null : (
                <a href="/register" className={classes.link}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Register
                  </Button>
                </a>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {isAuthUser ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon className={classes.icon} />
              ) : (
                <ChevronLeftIcon className={classes.icon} />
              )}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.listItems}>
            <a href={"/appointment"} className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <DateRangeIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"Make an appointment"} />
              </ListItem>
            </a>
            <a href={"/messenger"} className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={"Write a message"} />
              </ListItem>
            </a>
          </List>
        </Drawer>
      ) : null}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <div>
            <Switch>
              <Route
                exact
                path={"/"}
                render={() =>
                  isAuthUser ? <Home /> : <Redirect to={"/login"} />
                }
              />
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/messenger">
                <Messenger />
              </Route>
              <Route path="/appointment">
                <Appointment />
              </Route>
              <Route path="/appointmentSummary">
                <AppointmentSummary />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
    </div>
  );
}
