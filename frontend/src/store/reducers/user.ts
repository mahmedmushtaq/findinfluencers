import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { TYPES } from "../enums";

export interface State {
  id: string;
  email: string;
  token: string;
  role: "influencer" | "buyer" | "admin";
  isLoggedIn: boolean;
}

const initialState: State = {
  id: "",
  email: "",
  token: "",
  isLoggedIn: false,
  role: "influencer",
};

export const user = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case TYPES.ADD_USER:
      console.log("action.payload === ", action.payload);
      if (state.isLoggedIn === action.payload.isLoggedIn) {
        return state;
      }
      return { ...state, ...action.payload };
    case TYPES.LOGOUT_USER:
      console.log("state is = ", state);
      return { ...initialState };

    default:
      return state;
  }
};
