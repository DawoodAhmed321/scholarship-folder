import { showToast } from "@/utils/indext";
import axios from "axios";

export const API_URL = {
  LOGIN: "login",
  REGISTER: "register",
  PROFILE: "profile",
  IS_ADMIN: "user/is-admin",
};

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api/v1/";

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  (resp) => {
    return resp;
  },
  (error) => {
    switch (error.status) {
      case 401:
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 422:
      case 404:
      case 400:
        console.log("An error occurred", error.response);
        showToast(error.response.data.message, "error");
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default http;
