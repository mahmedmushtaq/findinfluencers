import { receivedMessage } from "../../../store/actions/chat";

const { useSelector } = require("react-redux");

const useMessageFeature = (user, dispatch) => {
  const messageSeen = (message) => {};

  return { messageSeen };
};

export default useMessageFeature;
