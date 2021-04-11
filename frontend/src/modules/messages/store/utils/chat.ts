export const leaveCurrentChat = (state, payload) => {
  const { chatId, userId, currentUserId } = payload;

  if (userId === currentUserId) {
    const chatsCopy = state.chats.filter((chat) => chat.id !== chatId);

    return {
      ...state,
      chats: chatsCopy,
      currentChat: state.currentChat.id === chatId ? {} : state.currentChat,
    };
  } else {
    const chatsCopy = state.chats.map((chat) => {
      if (chatId === chat.id) {
        return {
          ...chat,
          Users: chat.Users.filter((user) => user.id !== userId),
        };
      }

      return chat;
    });

    let currentChatCopy = { ...state.currentChat };
    if (currentChatCopy.id === chatId) {
      currentChatCopy = {
        ...currentChatCopy,
        Users: currentChatCopy.Users.filter((user) => user.id !== userId),
      };
    }

    return {
      ...state,
      chats: chatsCopy,
      currentChat: currentChatCopy,
    };
  }
};

export const addUserToGroup = (state, payload) => {
  const { chat, chatters } = payload;

  let exists = false;

  const chatsCopy = state.chats.map((chatState) => {
    if (chat.id === chatState.id) {
      exists = true;

      return {
        ...chatState,
        Users: [...chatState.Users, ...chatters],
      };
    }

    return chatState;
  });

  if (!exists) chatsCopy.push(chat);

  let currentChatCopy = { ...state.currentChat };

  if (Object.keys(currentChatCopy).length > 0) {
    if (chat.id === currentChatCopy.id) {
      currentChatCopy = {
        ...state.currentChat,
        Users: [...state.currentChat.Users, ...chatters],
      };
    }
  }

  return {
    ...state,
    chats: chatsCopy,
    currentChat: currentChatCopy,
  };
};

export const paginateMessage = (state, payload) => {
  const { messages, id, pagination } = payload;

  let currentChatCopy = { ...state.currentChat };

  const chatsCopy = state.chats.map((chat) => {
    if (chat.id === id) {
      const shifted = [...messages, ...chat.Messages];

      currentChatCopy = {
        ...currentChatCopy,
        Messages: shifted,
        Pagination: pagination,
      };

      return {
        ...chat,
        Messages: shifted,
        Pagination: pagination,
      };
    }

    return chat;
  });

  return {
    ...state,
    chats: chatsCopy,
    currentChat: currentChatCopy,
  };
};

export const senderTyping = (state, payload) => {
  console.log("payload is = ", payload);
  if (payload.typing) {
    return {
      ...state,
      senderTyping: payload,
      scrollBottom: state.scrollBottom + 1,
    };
  }

  return {
    ...state,
    senderTyping: payload,
  };
};

export const receivedMessage = (state, payload) => {
  const { userId, message } = payload;
  let currentChatCopy = { ...state.currentChat };
  let newMessage = { ...state.newMessage };
  let scrollBottom = state.scrollBottom;

  const chatsCopy = state.chats.map((chat) => {
    if (message.chatId === chat.id) {
      if (message.User.id === userId) {
        scrollBottom++;
      } else {
        newMessage = {
          chatId: chat.id,
          seen: false,
        };
      }

      if (message.chatId === currentChatCopy.id) {
        currentChatCopy = {
          ...currentChatCopy,
          Messages: [...currentChatCopy.Messages, ...[message]],
        };
      }

      return {
        ...chat,
        Messages: [...chat.Messages, ...[message]],
      };
    }

    return chat;
  });

  if (scrollBottom === state.scrollBottom) {
    return {
      ...state,
      chats: chatsCopy,
      currentChat: currentChatCopy,
      newMessage,
      senderTyping: { typing: false },
    };
  }

  return {
    ...state,
    chats: chatsCopy,
    currentChat: currentChatCopy,
    newMessage,
    scrollBottom,
    senderTyping: { typing: false },
  };
};

export const friendOffline = (state, payload) => {
  let currentChatCopy = { ...state.currentChat };

  const chatsCopy = state.chats.map((chat) => {
    const Users = chat.Users.map((user) => {
      if (user.id === payload.id) {
        return {
          ...user,
          status: "offline",
        };
      }
      return user;
    });

    if (chat.id === currentChatCopy.id) {
      currentChatCopy = {
        ...currentChatCopy,
        Users,
      };
    }

    return {
      ...chat,
      Users,
    };
  });

  return {
    ...state,
    chats: chatsCopy,
    currentChat: currentChatCopy,
  };
};

export const friendOnline = (state, payload) => {
  let currentChatCopy = { ...state.currentChat };

  const chatsCopy = state.chats.map((chat) => {
    const Users = chat.Users.map((user) => {
      if (user.id === payload.id) {
        return {
          ...user,
          status: "online",
        };
      }
      return user;
    });

    if (chat.id === currentChatCopy.id) {
      currentChatCopy = {
        ...currentChatCopy,
        Users,
      };
    }

    return {
      ...chat,
      Users,
    };
  });

  return {
    ...state,
    chats: chatsCopy,
    currentChat: currentChatCopy,
  };
};

export const friendsOffline = (state, payload) => {
  const chatsCopy = state.chats.map((chat) => {
    return {
      ...chat,
      Users: chat.Users.map((user) => {
        console.log("payload is = ", payload.includes(user.id));
        if (payload.includes(user.id)) {
          return {
            ...user,
            status: "online",
          };
        }
        return user;
      }),
    };
  });

  return {
    ...state,
    chats: chatsCopy,
  };
};

export const deleteChat = (state, payload) => {
  return {
    ...state,
    chats: state.chats.filter((chat) => chat.id !== payload),
    currentChat: state.currentChat.id === payload ? {} : state.currentChat,
  };
};
