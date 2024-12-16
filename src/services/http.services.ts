import { appDispatch } from "@/redux";
import { setDashboardLoader } from "@/redux/slices/appSlice";
import { showToast } from "@/utils/indext";
import axios from "axios";
import Router from "next/router";

export const API_URL = {
  LOGIN: "login",
  REGISTER: "register",
  PROFILE: "profile",

  SCHOLARSHIPS: "scholarships",
  OFFERS: "offers",
  DELETE: (
    id: number | string,
    type: "offers" | "scholarships" | "testimonials"
  ) => `${type}/${id}`,
  DETAIL: (
    id: number | string,
    type: "offers" | "scholarships" | "testimonials"
  ) => `${type}/${id}`,
  DASHBOARD: "dashboard",
};

export const BASE_URL = process.env.BASE_URL || "http://localhost:9000/api/v1/";

const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  if (process.browser) {
    appDispatch(setDashboardLoader(true));
  }
  const token = process.browser ? localStorage.getItem("user_token") : "";
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (resp) => {
    if (process.browser) {
      appDispatch(setDashboardLoader(false));
    }
    return resp;
  },
  (error) => {
    if (process.browser) {
      appDispatch(setDashboardLoader(false));
    }
    switch (error.status) {
      case 401:
        localStorage.clear();
        showToast("Unauthorized Access please login to continue", "error");
        // cookies().delete("user_token");
        Router.replace("/admin/login");
        break;
      case 422:
      case 404:
      case 400:
        console.log("An error occurred", error.response);
        showToast(error.response.data.message, "error");
        break;
      default:
        showToast("Something went wrong", "error");
        break;
    }

    return Promise.reject(error);
  }
);

export default http;
