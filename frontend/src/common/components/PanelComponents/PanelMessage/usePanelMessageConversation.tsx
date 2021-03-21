import React, { useEffect, useState, useContext } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { features, messages } from "../../../../socket";
import { socketContext } from "../../../layouts/PanelLayout/usePanel";
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../../../lib/graphql";
import randomstring from "randomstring";

const usePanelMessageConverstation = (props: { username: string }) => {
  const { username } = props;
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [writeMessage, setWriteMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: { input: { username } },
    errorPolicy: "all",
  });

  const socket = useContext(socketContext);
  const user = useSelector((store: RootStateOrAny) => store.user);
  useEffect(() => {
    if (!socket || !userId) return;
    features.isUserLive({ userId, loggedInUserId: user.id }, (payload) => {
      setStatus(payload.status);
    });

    return () => {
      features.stopIsUserLiveListener();
      //messages.OffReceivingMessages();
    };
  }, [socket, userId]);

  useEffect(() => {
    if (!data) return;
    setUserId(data.searchUser.id);
  }, [data]);

  useEffect(() => {
    messages.receivedMessage((data) => {
      console.log("received messages ", data);
    });
  });

  //   handlers
  const onChange = (e) => {
    setWriteMessage(e.target.value);
  };

  const sendMessage = () => {
    if (!socket || writeMessage.length === 0) return;

    const messageUniqueId = randomstring.generate(7);

    messages.sendMessage({
      fromId: user.id,
      toId: userId,
      messageUniqueId,
      body: writeMessage,
      date: Date.now(),
    });
  };

  const returnState = { status, onChange, writeMessage, sendMessage };
  return { state: returnState };
};

export default usePanelMessageConverstation;
