import { LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from "../types";

const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || {},
  // token: localStorage.getItem("token") || "",
  // isLoggedIn: !!localStorage.getItem("user"),
  user: {},
  token: "",
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      console.log("payload is ", payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
      };

    case LOGOUT:
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      return {
        ...state,
        user: {},
        token: "",
        isLoggedIn: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
