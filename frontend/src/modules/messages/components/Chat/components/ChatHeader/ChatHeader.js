import React from "react";
import { userStatus } from "../../../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Modal from "../../../Modal/Modal";
import ChatService from "../../../../services/chatService";
import styles from "../../../../../../../styles/scss/chats/ChatHeader.module.scss";
import clsx from "clsx";
import { Flex, Button } from "theme-ui";

const ChatHeader = ({ chat }) => {
  const user = useSelector((store) => store.user);

  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <div className={styles.chatter}>
        {chat.Users.map((user) => {
          return (
            <div key={user.id} className={styles["chatter-info"]}>
              <h3>
                {user.firstName} &nbsp;
                {user.lastName}
              </h3>
              <div className={styles["chatter-status"]}>
                <span
                  className={clsx(
                    styles.online_status,
                    styles[userStatus(user)]
                  )}
                ></span>
              </div>
            </div>
          );
        })}
      </div>
      {user.role === "buyer" && (
        <Button variant="contained" style={{ marginLeft: "auto" }}>
          Send Offer
        </Button>
      )}
    </Flex>
  );
};

export default ChatHeader;
