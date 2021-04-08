import React, { useEffect, useState, useContext, useMemo } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { features, messages, user as socketUser } from "../../../../socket";
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../../../lib/graphql";
import { useDispatch } from "react-redux";
import { SocketContext } from "../../../../context";
import { CHATTYPES } from "../../../../store/enums";

const usePanelMessageConversation = (props: { username: string }) => {
  const { username } = props;
  console.log("user name is = ", username);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [writeMessage, setWriteMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();
  const [conversationId, setConversationId] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);

  const socket = useContext(SocketContext);
  // const { state, dispatch } = useContext(PanelGlobalState);
  const { user, chat } = useSelector((store: RootStateOrAny) => store);
  // console.log("user is = ", user);

  // const currentMessages = useMemo(() => {
  //   if (!conversationId) return [];
  //   const list = chat.messageList[conversationId] ?? [];

  //   // also check from the server side either
  //   const lastMessageDateTime = list.length > 0 ? list[list.length - 1] : "";
  //   messages.loadMessages(
  //     { lastDateMsg: lastMessageDateTime, conversationId },
  //     user.id,
  //     (data) => {
  //       console.log("data payload is = ", username, data.payload);
  //       // if (data.payload.length > 0) {
  //       //   dispatch({
  //       //     type: CHATTYPES.LOAD_MESSAGES_DATA,
  //       //     payload: data.payload,
  //       //   });
  //       // }
  //     }
  //   );

  //   return list;
  // }, [username, conversationId]);

  // const getMessagesFromStore = useMemo(() => {
  //   if (!conversationId) return [];
  //   const list = chat.messageList[conversationId] ?? [];

  //   return list;
  // }, [conversationId]);

  // console.log("state is = ", state.messageList);

  // useEffect(() => {
  //   if (!data) return;

  //   setUserId(data.searchUser.id);
  // }, [data]);

  // useEffect(() => {
  //   if (!chat.messageList[conversationId]) return;

  //   setCurrentMessages([...])

  // }, [chat.messageList]);

  useEffect(() => {
    if (!socket) return;

    if (!conversationId) {
      setCurrentMessages([]);
      return;
    }
    let list = chat.messageList[conversationId] ?? [];

    console.log("list");

    // also check from the server side either
    const lastMessageDateTime =
      list.length > 0 ? list[list.length - 1].date : "";
    messages.loadMessages(
      { lastDateMsgDate: lastMessageDateTime, conversationId },
      user.id,
      (data) => {
        console.log(
          " ========== load messages data payload is ==========  ",
          username,
          data.payload
        );
        if (data.payload.length > 0) {
          list = [...list, ...data.payload];
          const reverseArray = data.payload.reverse();
          setCurrentMessages([...list, ...reverseArray]);
          dispatch({
            type: CHATTYPES.LOAD_MESSAGES_DATA,
            payload: reverseArray,
          });
        } else {
          setCurrentMessages(list);
        }
      }
    );

    return () => {
      messages.OffListeningMessages(user.id);
    };
  }, [conversationId]);

  useEffect(() => {
    if (!socket || !username) return;
    setCurrentMessages([]);

    socketUser.userInfoByUsername(user.id, username, (data) => {
      console.log("user info", data);
      setUserId(data.payload.id);
      setConversationId(data.payload.conversationId);
    });

    return () => {
      messages.OffListeningMessages(user.id);
    };
  }, [socket, username]);

  //  ========== listeners ============
  useEffect(() => {
    if (!userId) return;
    features.isUserLive({ userId, loggedInUserId: user.id }, (payload) => {
      setStatus(payload.status);
    });

    messages.receivedMessage((data) => {
      console.log("received messages = ", data);
      setCurrentMessages([...currentMessages, data]);
    });

    return () => {
      messages.OffReceivingMessages();
    };

    // features.getConversationId({ userId, loggedInUserId: user.id }, (data) => {
    //   if (!data.(payload)) return;
    //   setConversationId(data.payload);
    // });
  }, [userId]);

  //   handlers
  const onChange = (e) => {
    setWriteMessage(e.target.value);
  };

  const sendMessage = async () => {
    console.log("socket is = ", socket, writeMessage, userId);
    if (!socket || writeMessage.length === 0 || !userId) return;

    setIsSending(true);

    setWriteMessage(""); // empty the input field

    const messagePayload = await messages.sendMessage({
      fromId: user.id,
      toId: userId,
      body: writeMessage,
      date: Date.now(),
    });

    console.log("message payload is = ", messagePayload);

    if (!conversationId) {
      //@ts-ignore
      console.log(messagePayload.conversationId.id);
      // this mean new conversation has started
      //@ts-ignore
      setConversationId(messagePayload.conversationId.id);
    }

    dispatch({ type: CHATTYPES.ADD_MESSAGE, payload: messagePayload });
    setCurrentMessages([...currentMessages, messagePayload]);
    //currentMessages.push(messagePayload);
    setIsSending(false);
  };

  const returnState = {
    status,
    onChange,
    writeMessage,
    sendMessage,
    currentMessages,
    userId,
    isSending,
  };
  return { state: returnState };
};

export default usePanelMessageConversation;
