import axios from "axios";
import { store } from "../../../store";
import { logout } from "../store/actions/auth";
const getToken = () => {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");

    return token !== "undefined" ? token : "";
  }
  return "";
};

const API = axios.create({
  baseURL: process.env.CHAT_APP_URL, 
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

console.log("API is = ", API);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status !== 401) {
      throw err;
    }

    if (typeof err.response.data.error.name !== "undefined") {
      if (err.response.data.error.name === "TokenExpiredError") {
        store.dispatch(logout());
        throw err;
      }
    }
  }
);

export default API;
