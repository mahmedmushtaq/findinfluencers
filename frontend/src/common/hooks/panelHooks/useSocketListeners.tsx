import { useContext, useEffect, useReducer, useState } from "react";
import { messages } from "../../../socket";
import { MessageType } from "../../../socket/Messages/types";
import { useDispatch } from "react-redux";
import { CHATTYPES } from "../../../store/enums";

const useSocketListeners = (props: { socket }) => {
  const { socket } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    messages.receivedMessage((messagesData) => {
      console.log("======== received messages Data ======== ", messagesData);
      dispatch({ type: CHATTYPES.ADD_MESSAGE, payload: messagesData });
    });

    return () => {
      messages.OffReceivingMessages();
    };
  }, [socket]);

  // return { state, dispatch };
};

export default useSocketListeners;
