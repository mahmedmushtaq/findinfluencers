import axios from "axios";
import { store } from "../../../store";
import { logout } from "../store/actions/auth";
const getToken = () => {
  // const token = localStorage.getItem("token");
  // console.log("token is = ", token);
  // return token !== "undefined" ? JSON.parse(token) : "";
  return "";
};

const API = axios.create({
  baseURL: "http://localhost:4001",
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
