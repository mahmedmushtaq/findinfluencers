import axios from "axios";
import { REGISTRATION_URL_ENDPOINT, UPDATE_URL_ENDPOINT } from "./url";

export const newUserEvent = async (data: {
  id: string;
  firstName: string;
  email: string;
  password: string;
}) => {
  try {
    // send new user request to messages services
    const res = await axios.post(REGISTRATION_URL_ENDPOINT, data);
    return res.data;
  } catch (err) {
    console.log("error in sending new suer event ", err);
  }
};

export const updateUserEvent = async (
  token: string,
  data: {
    email: string;
    firstName: string;
    password?: string;
  }
) => {
  try {
    const res = await axios.post(UPDATE_URL_ENDPOINT, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.log("error in sending update user event", err);
  }
};
