import axios from "axios";
import { REGISTRATION_URL_ENDPOINT } from "./url";

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
