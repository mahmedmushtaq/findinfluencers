import { combineReducers } from "redux";
import authReducer from "./auth";
import chatReducer from "./chat";

const messageRootReducer = {
  authReducer,
  chatReducer,
}

export default messageRootReducer;
