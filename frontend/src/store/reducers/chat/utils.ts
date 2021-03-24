export const addMessages = (state, payload) => {
  const data = payload;

  if (typeof data.conversationId === "string") {
    // conversation is already present
    let record = state.messageList[data.conversationId!] ?? [];

    // const stateValue = {
    //   ...state,
    //   messageList: {
    //     ...state.messageList,
    //     [data.conversationId]: [...record, data],
    //   },
    // };
    console.log(
      "record is = ",
      record,
      "data is ",
      data,
      "payload is = ",
      payload,
      "state value",
      state
      // stateValue
    );

    // if (!record) {
    //   record = [data];
    // } else {
    //   record = [...record, data];
    // }

    return {
      ...state,
      messageList: {
        ...state.messageList,
        [data.conversationId]: [...record, data],
      },
    };
  } else {
    // add new conversation
    const addConversationState = addConversation(state, payload.conversationId);

    // payload.conversationId = payload.conversationId.id;
    const addMsgState = addMessages(addConversationState, {
      ...payload,
      conversationId: payload.conversationId.id,
    });

    console.log("add Msg state", addMsgState);
    return addMsgState;
  }
};

export const addConversation = (state, payload) => {
  const conversation = payload;
  const findConversation = state.conversations
    ? state.conversations.find((con) => con.id === conversation.id)
    : undefined;
  if (findConversation) {
    // conversation is already present
    return { ...state };
  }
  let conversationArray = state.conversations ?? [];
  return {
    ...state,
    conversations: [...conversationArray, conversation],
  };
};
