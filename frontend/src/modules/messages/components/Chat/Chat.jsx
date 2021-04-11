import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchChats } from "../../store/actions/chat";
import { useEffect } from "react";
import FriendList from "./components/FriendList/FriendList";
import Messenger from "./components/Messenger/Messenger";
import socketConnection from "./hooks/socketConnection";
import styles from "../../../../../styles/scss/chats/Chat.module.scss";


const Chat = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  socketConnection(user, dispatch);

  return (
    <div className={styles["chat_container"]}>
      <div className={styles["chat_wrap"]}>
        <FriendList />
        <Messenger />
        {/* <Messenger /> */}
      </div>
    </div>
  );
};

export default Chat;
