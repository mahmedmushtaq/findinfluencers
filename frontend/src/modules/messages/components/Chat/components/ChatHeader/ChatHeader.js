import React from "react";
import { userStatus } from "../../../../utils/helpers";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "../../../../../../../styles/scss/chats/ChatHeader.module.scss";
import clsx from "clsx";
import { Flex, Button } from "theme-ui";

const ChatHeader = ({ chat }) => {
  const user = useSelector((store) => store.user);

  console.log(chat.Users[0]);

  return (
    <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
      <div className={styles.chatter}>
        {/* {chat.Users.map((user) => { */}
        {/* return ( */}
        <div key={chat.Users[0].id} className={styles["chatter-info"]}>
          <h3>
            {chat.Users[0].firstName} &nbsp;
            {chat.Users[0].lastName}
          </h3>
          <div className={styles["chatter-status"]}>
            <span
              className={clsx(
                styles.online_status,
                styles[userStatus(chat.Users[0])]
              )}
            ></span>
          </div>
        </div>
        {/* ); */}
        {/* })} */}
      </div>
      {user.role === "buyer" && (
        <Link
          href={{
            pathname: "/panel/business/offer/[username]",
            query: { username: chat.Users[0].id },
          }}
        >
          <Button variant="contained" style={{ marginLeft: "auto" }}>
            Send An Offer
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default ChatHeader;
