import { useEffect, useReducer, useState } from "react";
import socketIOClient from "socket.io-client";
import { SocketSubject } from "./socketSubject";
import { ReceivedNotificationType } from "./socketTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION_RECEIVED":
      state.numNotifications++;
      return {
        ...state,
      };
    case "RESET_NUM_NOTIFICATIONS":
      console.log("reset is = ");
      state.numNotifications = 0;
      return {
        ...state,
        numNotifications: 0,
      };
    default:
      return state;
  }
};

const initialState = { numNotifications: 0 };

const useSocket = (user) => {
  //   const [state, reducerDispatch] = useReducer(reducer, initialState);
  const [state, setState] = useState({
    notMsg: "",
  }); //useReducer(reducer, initialState);

  useEffect(() => {
    const socket = socketIOClient(process.env.SERVER_URL, {
      query: { token: user?.token },
    });

    socket.on(
      SocketSubject.receivedNotification,
      (payload: ReceivedNotificationType) => {
        console.log(" ==== new notification has received ====", payload);
        // reducerDispatch({ type: "NEW_NOTIFICATION_RECEIVED" });
        const emitObject = Array.isArray(payload) ? payload : [payload];
        socket.emit(SocketSubject.readNotifications, emitObject);
        let notMsg = Array.isArray(payload)
          ? payload.length > 1
            ? "New Notifications Have Been Received"
            : "New Notification Has Been Received"
          : "New Notification Has Been Received";
        setState((prevState) => ({
          ...prevState,
          notMsg,
        }));
      }
    );

    return () => {
      socket?.off(SocketSubject.receivedNotification);
    };
  }, [user]);

  return { state, setState };
};

export default useSocket;
