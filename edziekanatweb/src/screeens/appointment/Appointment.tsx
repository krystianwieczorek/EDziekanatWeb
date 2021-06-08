import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { AppointmentStyles } from "./AppointmentStyles";
import {
  GetAvailableOperationsByDeansOfficeId,
  GetReservationsAvailableDaysForCurrentMonth,
  GetReservationsAvailableHoursForChoosenDay,
} from "../../api/reservationsClient";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CustomModal from "../../components/CustomModal";
import { useSelector } from "react-redux";
import {
  deanOfficeIdSelector,
  userIdSelector,
  userRoleSelector,
} from "../../store/selectors/authSelector";
import Loader from "../../components/Loader";
import AssistantIcon from "@material-ui/icons/Assistant";

const Appointment = () => {
  const [value, onChange] = useState<any>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedIndexNext, setSelectedIndexNext] = useState<number>();
  const [availableDays, setAvailableDays] = useState<any>();
  const [availableHours, setAvailableHours] = useState<any>();
  const [isOpenModal, setIsOpenModal] = useState<any>(false);
  const [fullDate, setFullDate] = useState<any>();
  const [operations, setOperations] = useState<any[]>([]);
  const [choosedOperation, setChoosedOperation] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [date, setDate] = useState<any>();
  const classes = AppointmentStyles();

  const studentId = useSelector(userIdSelector);
  const deansOfficeId = useSelector(deanOfficeIdSelector);

  useEffect(() => {
    GetReservationsAvailableDaysForCurrentMonth(deansOfficeId).then(
      (response) => {
        console.log(response.data);
        setAvailableDays(response.data);
      }
    );

    GetAvailableOperationsByDeansOfficeId(deansOfficeId).then(
      (response: any) => {
        setOperations(response.data);
      }
    );
  }, [deansOfficeId]);

  const handleClick = (value: any) => {
    console.log(value);
    setDate(value);
    GetReservationsAvailableHoursForChoosenDay(deansOfficeId, value).then(
      (response) => {
        console.log(response.data);
        setAvailableHours(response.data);
      }
    );
  };

  const handleListItemClick = (key: number, item: any) => {
    setSelectedIndex(key);
    setIsOpenModal(true);
    setFullDate(date + " " + item);
    console.log(date + " " + item);
  };

  const handleNextListItemClick = (key: number, item: any) => {
    setSelectedIndexNext(key);
    setChoosedOperation(item);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isOpenModal && (
            <CustomModal
              handleModalClose={handleModalClose}
              date={fullDate}
              deansOfficeId={deansOfficeId}
              studentId={studentId}
              choosedOperation={choosedOperation}
              setIsLoading={setIsLoading}
            />
          )}
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <h1>Appointment</h1>
            </Grid>
            <Grid container direction="row" space-around justify="space-evenly">
              <Grid item>
                <Calendar
                  onChange={onChange}
                  value={value}
                  defaultView={"month"}
                  maxDetail={"month"}
                  minDetail={"month"}
                  showNeighboringMonth={false}
                  onClickDay={(value: any, event: any) =>
                    handleClick(
                      new Date(value)
                        .toLocaleDateString("en-US")
                        .replace(/\//g, "-")
                    )
                  }
                  next2Label={null}
                  nextLabel={null}
                  prevLabel={null}
                  prev2Label={null}
                  tileDisabled={({ activeStartDate, date, view }) =>
                    !availableDays?.includes(date.getDate())
                  }
                />
              </Grid>
              <Grid item>
                <div className={classes.listContainer}>
                  <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                      {availableHours &&
                        operations.map((item: any, key: any) => (
                          <ListItem
                            button
                            selected={selectedIndexNext === key}
                            onClick={(event) =>
                              handleNextListItemClick(key, item)
                            }
                          >
                            <ListItemIcon>
                              <AssistantIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                    </List>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div className={classes.listContainer}>
                  <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                      {choosedOperation &&
                        availableHours.map((item: any, key: any) => (
                          <ListItem
                            button
                            selected={selectedIndex === key}
                            onClick={(event) => handleListItemClick(key, item)}
                          >
                            <ListItemIcon>
                              <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                    </List>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
export default Appointment;
