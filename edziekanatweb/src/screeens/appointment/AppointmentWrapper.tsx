import React from "react";
import { useSelector } from "react-redux";
import userRole from "../../common/constants/userRole";
import { userRoleSelector } from "../../store/selectors/authSelector";
import Appointment from "./Appointment";
import EmployeeAppointment from "./EmployeeAppointment";

const AppointmentWrapper = () => {
  const role = useSelector(userRoleSelector);

  return role && role[0].toUpperCase() === userRole.Student ? (
    <Appointment />
  ) : (
    <EmployeeAppointment />
  );
};

export default AppointmentWrapper;
