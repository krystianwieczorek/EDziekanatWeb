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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.png";
import { Button, Grid } from "@material-ui/core";
import Login from "../screeens/login/Login";
import DateRangeIcon from "@material-ui/icons/DateRange";

export default function Layout() {
  const classes = LayoutStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <a href="/" className={classes.tittle}>
              E - dziakanat
            </a>
            <a href="/">
              <img src={logo} className={classes.logo} alt="Logo" />
            </a>

            <Grid item>
              <a href="/login" className={classes.link}>
                <Button>Zaloguj</Button>
              </a>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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
          <ListItem button>
            <ListItemIcon>
              <DateRangeIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Umów wizyte"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Napisz wiadomość"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <div>
            <Switch>
              <Route exact path="/"></Route>
              <Route path="/login">
                <Login />
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
