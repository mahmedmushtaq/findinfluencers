import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  addUserToGroup,
  createChat,
  deleteChat,
  fetchChats,
  leaveCurrentChat,
  offlineFriend,
  onlineFriend,
  onlineFriends,
  receivedMessage,
  senderTyping,
  setSocket,
  chatsList,
} from "../../../store/actions/chat";
import API from "../../../services/api";

const ENDPOINT = "http://localhost:4001";

const useSocket = (user, dispatch) => {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    dispatch(setSocket(socket));
    (async () => {
      try {
        console.log("token is = ", user.token);
        API.defaults.headers["Authorization"] = `Bearer ${user.token}`;
        const res = await dispatch(fetchChats());

        console.log(" === load all chats ======= ", res);

        // socket.emit("chats", user);

        // socket.on("chats", (chats) => {
        //   console.log(
        //     " ============= chats are received ============= ",
        //     chats
        //   );
        //   dispatch(chatsList(chats));
        // });

        socket.emit("join", user);
        socket.on("typing", (user) => {
          console.log(" ====== typing ", user);
        });

        socket.on("friends", (friends) => {
          console.log("friends is = ", friends);
          dispatch(onlineFriends(friends));
        });

        socket.on("typing", (sender) => {
          dispatch(senderTyping(sender));
        });

        socket.on("online", (user) => {
          dispatch(onlineFriend(user));
          console.log("online user is = ", user);
        });
        socket.on("offline", (user) => {
          dispatch(offlineFriend(user));
          console.log("offline user is= ", user);
        });

        socket.on("received", (message) => {
          dispatch(receivedMessage(message, user.id));

          // console.log("received message ", message);
        });

        socket.on("new-chat", (chat) => {
          dispatch(createChat(chat));
        });

        socket.on("added-user-to-group", (group) => {
          dispatch(addUserToGroup(group));
        });

        socket.on("remove-user-from-chat", (data) => {
          dispatch(leaveCurrentChat(data));
        });

        socket.on("delete-chat", (chatId) => {
          dispatch(deleteChat(chatId));
        });
      } catch (err) {}
    })();

    return () => {
      socket.off("join");
      socket.off("friends");
      socket.off("typing");
      socket.off("online");
      socket.off("offline");
      socket.off("received");
      socket.off("new-chat");
      socket.off("added-user-to-group");
      socket.off("remove-user-from-chat");
      socket.off("delete-chat");
    };
  }, [dispatch, user]);
};

export default useSocket;
