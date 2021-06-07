import { apiClient } from "./apiClient";

export const getConversation = (studentId: string, deansOfficeId: string) => {
  const response = apiClient.get(
    `/api/Messages/GetConversation?studentId=${studentId}&deansOfficeId=${deansOfficeId}`
  );
  return response;
};
export const getStudentsWhichHaveConversation = (deansOfficeId: string) => {
  const response = apiClient.get(
    `/api/Messages/GetStudentsWhichHaveConversation?&deansOfficeId=${deansOfficeId}`
  );
  return response;
};
