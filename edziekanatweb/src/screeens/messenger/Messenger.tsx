import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import configuration from "../../helpers/configFile";
import * as signalR from "@aspnet/signalr";
import { useSelector } from "react-redux";
import {
  deanOfficeIdSelector,
  userFirstName,
  userIdSelector,
  userLastName,
} from "../../store/selectors/authSelector";
import { getConversation } from "../../api/messagesClient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      height: "80vh",
      "& > *": {
        margin: theme.spacing(1),
        height: "auto",
        width: "100%",
      },
    },
    width100: {
      width: "100%",

      "& > *": {
        width: "100%",
      },
    },
    form: {
      height: "100%",
    },
    list: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    messageCOntainer: {
      maxHeight: "70vh",
      overflow: "auto",
      width: "100%",
    },
    grid: {
      height: "100%",
    },
    inline: {
      display: "inline",
    },
  })
);

export default function Messenger() {
  const [connection, setConnetction] = useState<any>(null);
  const [messages, setMessages] = useState();

  const userId = useSelector(userIdSelector);
  const firstName = useSelector(userFirstName);
  const lastName = useSelector(userLastName);
  const deansOfficeId = useSelector(deanOfficeIdSelector);

  const classes = useStyles();

  const { register, handleSubmit, watch, control, reset } = useForm();

  const connectionHub = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:44313/chatHub")
    .build();

  // useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    getConversation(userId, deansOfficeId).then((response) => {
      // console.log(response);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    connectionHub.on("ReceiveMessage", (response) => {
      console.log(response);
      setMessages(response.rootElement);
    });
    connectionHub
      .start()
      .then(function() {
        console.log("connection start");
      })
      .catch(function(err) {
        return console.error(err.toString());
      });
    setConnetction(connectionHub);
  }, []);

  const onSubmit = (data: any) => {
    reset({ text: "" });
    data.userId = userId;
    data.firstName = firstName;
    data.lastName = lastName;
    data.deansOfficeId = deansOfficeId;
    data.studentId = userId;
    // console.log(data);
    connection.invoke("SendPrivateMessage", data).catch(function(err: any) {
      console.log(err);
    });
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.grid}
          >
            <Grid item className={classes.messageCOntainer}>
              <List className={classes.list}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Cindy Baker"
                      src="/static/images/avatar/3.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Oui Oui"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Sandra Adams
                        </Typography>
                        {" — Do you have Paris recommendations? Have you ever…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </Grid>
            <Grid item className={classes.width100}>
              <Controller
                name="text"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
