import axios from "axios";
import { REGISTRATION_URL_ENDPOINT, UPDATE_URL_ENDPOINT } from "./url";

export const newUserEvent = async (data: {
  id: string;
  firstName: string;
  email: string;
  password: string;
}) => {
  // send new user request to messages services
  const res = await axios.post(REGISTRATION_URL_ENDPOINT, data);
  return res.data;
};

export const updateUserEvent = async (
  token: string,
  data: {
    email: string;
    firstName: string;
    password?: string;
  }
) => {
  const res = await axios.post(UPDATE_URL_ENDPOINT, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
