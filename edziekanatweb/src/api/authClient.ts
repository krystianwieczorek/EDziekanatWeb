import { apiClient } from "./apiClient";

export const loginRequest = async (data: any) => {
  const response = await apiClient.post(`/api/login`, data);
  localStorage.setItem("token", response.data.token);
  return response;
};

export const registerRequest = (data: any) => {
  const response = apiClient.post(`/api/Register`, data);
  return response;
};
