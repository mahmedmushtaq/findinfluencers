import { combineReducers } from "redux";
import { user } from "./user";
import messageRootReducer from "../../modules/messages/store/reducer";

const reducers = combineReducers({ user, ...messageRootReducer });

export { reducers };
