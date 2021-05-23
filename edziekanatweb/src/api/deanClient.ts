import { apiClient } from "./apiClient";

export const getDepartments = () => {
  const response = apiClient.get(`/api/Departments`);
  return response;
};
