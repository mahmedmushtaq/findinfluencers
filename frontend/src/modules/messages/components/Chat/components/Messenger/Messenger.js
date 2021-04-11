import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageBox from "../MessageBox/MessageBox";
import MessageInput from "../MessageInput/MessageInput";

import styles from "../../../../../../../styles/scss/chats/Messenger.module.scss";
import clsx from "clsx";

const Messenger = () => {
  const chat = useSelector((state) => state.chatReducer.currentChat);

  const activeChat = () => {
    return Object.keys(chat).length > 0;
  };

  return (
    <div className={clsx("shadow-light", styles.messenger)}>
      {activeChat() ? (
        <div className={styles["messenger-wrap"]}>
          <ChatHeader chat={chat} />
          <hr />
          <MessageBox chat={chat} />

          <MessageInput chat={chat} />
        </div>
      ) : (
        <p>No active chat</p>
      )}
    </div>
  );
};

export default Messenger;
