import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Friend from "../Friend/Friend";
// import { setCurrentChat } from "../../../../store/actions/chat";
import Modal from "../../../Modal/Modal";
import ChatService from "../../../../services/chatService";
import styles from "../../../../../../../styles/scss/chats/FriendList.module.scss";
import { setCurrentChat } from "../../../../store/actions/chat";
import clsx from "clsx";

const FriendList = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatReducer.chats);
  const socket = useSelector((state) => state.chatReducer.socket);
  const user = useSelector((store) => store.user);

  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const openChat = (chat) => {
    const userId = user.id;
    const lastMsg = chat.Messages[chat.Messages.length - 1];
    const chatId = chat.id;
    let chatMessages = chat.Messages;

    if (lastMsg) {
      socket.emit("message-seen", { userId, chatId, messageId: lastMsg.id });
      chatMessages[chatMessages.length - 1].seen = true;
    }

    dispatch(setCurrentChat({ ...chat, Messages: chatMessages }));
  };

  const searchFriends = (e) => {
    ChatService.searchUsers(e.target.value).then((res) => {
      console.log("suggestions ", res);
    });
  };

  const addNewFriend = async (id) => {
    const chats = await ChatService.createChat(id);
    socket.emit("add-friend", chats);
    setShowFriendsModal(false);
  };

  return (
    <div className={clsx(styles["friends"], "shadow-light")}>
      <div className={styles.title}>
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendsModal(true)}>ADD</button>
      </div>

      <hr />

      <div className={styles["friends-box"]}>
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
            );
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
    </div>
  );
};

export default FriendList;
