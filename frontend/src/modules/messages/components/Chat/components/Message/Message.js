import clsx from "clsx";
import React, { useEffect } from "react";
import { Box, Text } from "theme-ui";
import styles from "../../../../../../../styles/scss/chats/Message.module.scss";
import timeAgo from "../../../../utils/timeAgo";

const Message = ({ user, chat, index, message }) => {
  const determineMargin = () => {
    if (index + 1 === chat.Messages.length) return;

    console.log("message is = ", message.text, message.fromUserId, user.id);

    return message.fromUserId === chat.Messages[index + 1].fromUserId
      ? "mb-5"
      : "mb-10";
  };

  const printTime = (
    <Text style={{ fontSize: 10, marginTop: "auto" }}>
      {timeAgo.ago(message.updatedAt)}
    </Text>
  );

  return (
    <Box>
      <div
        className={clsx(
          styles["message"],
          styles[determineMargin()],
          styles[message.fromUserId === user.id ? "creator" : ""]
        )}
      >
        {message.fromUserId === user.id && printTime}
        <div
          className={
            styles[message.fromUserId === user.id ? "owner" : "other-person"]
          }
        >
          {message.type === "text" ? (
            <Box>
              <p className="m-0">{message.message}</p>
            </Box>
          ) : (
            <Box>
              <img src={message.message} alt="User upload" />
            </Box>
          )}
          {/* {message.fromUserId !== user.id ? (
          <h6 className="m-0">
            {message.User.firstName} {message.User.lastName}
          </h6>
        ) : null}{" "}
        {message.type === "text" ? (
          <p className="m-0">{message.message}</p>
        ) : (
          <img src={message.message} alt="User upload" />
        )} */}
        </div>
        {message.fromUserId !== user.id && printTime}
      </div>
    </Box>
  );
};

export default Message;
