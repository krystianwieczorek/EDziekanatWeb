import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import UpdateIcon from "@material-ui/icons/Update";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { CancelReservation } from "../api/reservationsClient";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function NestedList(props: any) {
  const { reservations, studentId } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = (key: any) => {
    setOpen(key);
  };

  const handleCancelReservation = (id: any) => {
    CancelReservation(id).then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
    });
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Active Reservations of student: {studentId}
        </ListSubheader>
      }
      className={classes.root}
    >
      {reservations.map((item: any, key: any) => (
        <>
          <ListItem button onClick={() => handleClick(key)}>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText primary={`${new Date(item.date).toLocaleString()}`} />
            {open === key ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === key} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => handleCancelReservation(item.id)}
              >
                <ListItemIcon>
                  <HighlightOffIcon />
                </ListItemIcon>
                <ListItemText primary="Cancel Reservation" />
              </ListItem>
            </List>
          </Collapse>
        </>
      ))}
    </List>
  );
}
