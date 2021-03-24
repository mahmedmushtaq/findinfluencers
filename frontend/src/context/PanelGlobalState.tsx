import { createContext } from "react";

const initialState = {
  messageList: {}, // it will contain data by in this form messageList { conversationId: [messagesObjectsArray]}
  conversations: [], // it will contain conversationsId
};

export const PanelGlobalState = createContext<{
  // // it contains all messages
  // messageList: any;
  // //  add messages to messageList
  // setMessageList: Function;
  state: any; // useReducer State
  dispatch: Function; // useReducer Dispatch Function
}>({ state: initialState, dispatch: () => {} });
