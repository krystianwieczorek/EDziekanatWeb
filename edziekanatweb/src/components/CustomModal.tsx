import React, { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Reserve } from "../api/reservationsClient";
import { useHistory } from "react-router";
import Loader from "./Loader";

export default function CustomModal(props: any) {
  const {
    handleModalClose,
    date,
    deansOfficeId,
    studentId,
    setIsLoading,
    choosedOperation,
  } = props;
  const history = useHistory();

  const handleClick = useCallback(() => {
    const data = {
      date: date,
      deansOfficeId: deansOfficeId,
      studentId: studentId,
      operationName: choosedOperation,
    };
    setIsLoading(true);
    setTimeout(() => {
      try {
        Reserve(data).then((response) => {
          if (response.status === 201) {
            history.push("/AppointmentSummary");
          }
          console.log(response);
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  }, [date, studentId, deansOfficeId, history, setIsLoading]);

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Potwierdź rezerwacje"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Czy potwierdzasz rezerwację w dniu {date} .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleClick} color="primary">
            Potwierdzam
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
