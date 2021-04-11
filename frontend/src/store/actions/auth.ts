import { TYPES } from "../enums";
import API from "../../modules/messages/services/api";

export const loginUserAction = (data) => (dispatch: any) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("token", data.token);
  }
  API.defaults.headers["Authorization"] = `Bearer ${data.token}`;
  dispatch({ type: TYPES.ADD_USER, payload: data });
};
