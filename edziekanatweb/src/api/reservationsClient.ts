import { apiClient } from "./apiClient";

export const GetReservationsAvailableDaysForCurrentMonth = (id: any) => {
  const response = apiClient.get(
    `/api/Reservations/GetReservationsAvailableDaysForCurrentMonth?deansOfficeId=${id}`
  );
  return response;
};

export const GetReservationsAvailableHoursForChoosenDay = (
  id: any,
  date: any
) => {
  const response = apiClient.get(
    `/api/Reservations/GetReservationsAvailableHoursForChoosenDay?deansOfficeId=${id}&date=${date}`
  );
  return response;
};

export const Reserve = (date: any) => {
  const response = apiClient.post(`/api/Reservations/Reserve`, date);
  return response;
};

export const GetAllCurrentReservationsForStudent = (studentId: any) => {
  const response = apiClient.get(
    `/api/Reservations/GetAllCurrentReservationsForStudent?studentId=${studentId}`
  );
  return response;
};
export const GetReservationsByDeansOfficeId = (deansOfficeId: any) => {
  const response = apiClient.get(
    `/api/Reservations/GetReservationsByDeansOfficeId?deansOfficeId=${deansOfficeId}`
  );
  return response;
};

export const CancelReservation = (id: any) => {
  const response = apiClient.post(
    `/api/Reservations/CancelReservation?id=${id}`
  );
  return response;
};
