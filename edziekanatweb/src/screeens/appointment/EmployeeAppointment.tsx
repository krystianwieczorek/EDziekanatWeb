import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetReservationsByDeansOfficeId } from "../../api/reservationsClient";
import NestedList from "../../components/NestedList";
import { deanOfficeIdSelector } from "../../store/selectors/authSelector";

const EmployeeAppointment = () => {
  const [reservations, setReservations] = useState([]);

  const deansOfficeId = useSelector(deanOfficeIdSelector);

  useEffect(() => {
    GetReservationsByDeansOfficeId(deansOfficeId).then((response) => {
      setReservations(response.data);
      console.log(response.data);
    });
  }, []);

  return <NestedList reservations={reservations} isEmployeeView={true} />;
};

export default EmployeeAppointment;
