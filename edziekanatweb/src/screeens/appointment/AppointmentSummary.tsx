import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetAllCurrentReservationsForStudent } from "../../api/reservationsClient";
import NestedList from "../../components/NestedList";
import { userIdSelector } from "../../store/selectors/authSelector";

const AppointmentSummary = () => {
  const [reservations, setReservations] = useState([]);
  const studentId = useSelector(userIdSelector);

  useEffect(() => {
    GetAllCurrentReservationsForStudent(studentId).then((response) => {
      setReservations(response.data);
      console.log(response.data);
    });
  }, []);

  return <NestedList reservations={reservations} studentId={studentId} />;
};

export default AppointmentSummary;
