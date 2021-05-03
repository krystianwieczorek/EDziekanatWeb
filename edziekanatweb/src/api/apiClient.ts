import axios from "axios";
import configuration from "../helpers/configFile";

export const apiClient = axios.create({
  baseURL: configuration.apiUrl,
  headers: { "Access-Control-Allow-Origin": "*" },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
