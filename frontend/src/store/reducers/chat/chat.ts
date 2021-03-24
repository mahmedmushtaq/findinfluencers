import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { CHATTYPES, TYPES } from "../../enums";
import { addConversation, addMessages } from "./utils";

export interface State {
  messageList: {};
  conversations: [];
}

const initialState: State = {
  messageList: {},
  conversations: [],
};

export const chat = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case CHATTYPES.ADD_MESSAGE:
      const data = action.payload;

      return addMessages(state, data);

    case CHATTYPES.ADD_CONVERSATIONS:
      return { ...state, conversations: action.payload };

    case CHATTYPES.LOAD_MESSAGES_DATA:
      const messagesArray = action.payload;

      const loadMessagesConversationId = messagesArray[0].conversationId;
      let messagesData = state.messageList[loadMessagesConversationId];
      if (messagesData) {
        messagesData.push(messagesArray);
      } else {
        messagesData = messagesArray;
      }

      return {
        ...state,
        messageList: {
          ...state.messageList,
          [loadMessagesConversationId]: messagesData,
        },
      };

    default:
      return state;
  }
};
