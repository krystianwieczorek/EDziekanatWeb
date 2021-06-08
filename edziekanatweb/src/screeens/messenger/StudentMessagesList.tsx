import React, { useEffect, useState } from "react";
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
import StarBorder from "@material-ui/icons/StarBorder";
import { getStudentsWhichHaveConversation } from "../../api/messagesClient";
import { useDispatch, useSelector } from "react-redux";
import { deanOfficeIdSelector } from "../../store/selectors/authSelector";
import { useHistory } from "react-router";
import { studentIdAction } from "../../store/actions/studentIdAction";

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

export default function StudentMessagesList() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [conversations, setConversations] = useState<any>([]);
  const deansOfficeId = useSelector(deanOfficeIdSelector);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    getStudentsWhichHaveConversation(deansOfficeId).then((response: any) => {
      console.log(response.data);
      setConversations(response.data);
    });
  }, []);

  const handleCLick = (studentId) => {
    dispatch(studentIdAction(studentId));

    history.push("/Messenger");
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Wiadomości studentów
        </ListSubheader>
      }
      className={classes.root}
    >
      {conversations.map((item: any, key: any) => (
        <ListItem button onClick={() => handleCLick(item.id)} key={key}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={`${item.firstName} ${item.lastName}`} />
        </ListItem>
      ))}
    </List>
  );
}
