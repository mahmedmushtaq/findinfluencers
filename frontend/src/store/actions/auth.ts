import { TYPES } from "../enums";
import API from "../../modules/messages/services/api";

export const loginUserAction = (data) => (dispatch: any) => {
  console.log("data is = ", data.token);
  API.defaults.headers["Authorization"] = `Bearer ${data.token}`;
  dispatch({ type: TYPES.ADD_USER, payload: data });
};
