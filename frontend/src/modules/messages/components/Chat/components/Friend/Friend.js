import React from "react";
import { useSelector } from "react-redux";
import { userStatus } from "../../../../utils/helpers";
import styles from "../../../../../../../styles/scss/chats/Friend.module.scss";
import clsx from "clsx";
import { Text } from "theme-ui";

const Friend = ({ chat, click }) => {
  const currentChat = useSelector((state) => state.chatReducer.currentChat);

  const isChatOpened = () => {
    return currentChat.id === chat.id ? "opened" : "";
  };

  const lastMessage = () => {
    if (chat.Messages.length === 0) return "";

    const message = chat.Messages[chat.Messages.length - 1];
    return message.type === "image" ? (
      "image uploaded"
    ) : (
      <Text style={{ color: message.seen ? "black" : "red" }}>
        {message.message.length > 15
          ? message.message.substr(0, 15) + "..."
          : message.message}
      </Text>
    );
  };

  return (
    <div
      onClick={click}
      className={clsx(styles["friend-list"], styles[isChatOpened()])}
    >
      <div>
        <img
          width="40"
          height="40"
          src={chat.Users[0].avatar}
          alt="User avatar"
        />
        <div className={styles["friend-info"]}>
          <h4 className="m-0">
            {chat.Users[0].firstName} {chat.Users[0].lastName}
          </h4>
          <h5 className="m-0">{lastMessage()}</h5>
        </div>
      </div>
      <div className={styles["friend-status"]}>
        <span
          className={clsx(
            styles["online_status"],
            styles[userStatus(chat.Users[0])]
          )}
        ></span>
      </div>
    </div>
  );
};

export default Friend;
