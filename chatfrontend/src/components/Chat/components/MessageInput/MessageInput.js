import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatService from "../../../../services/chatService";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import "./MessageInput.scss";
import {
  incrementalScroll,
  paginateMessages,
} from "../../../../store/actions/chat";

const MessageInput = ({ chat }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const newMessage = useSelector((state) => state.chatReducer.newMessage);
  const [showNewMessageNotification, setShowNewMessageNotification] = useState(
    false
  );
  const msgInput = useRef();

  const socket = useSelector((store) => store.chatReducer.socket);
  const user = useSelector((store) => store.authReducer.user);
  const fileUpload = useRef();
  const dispatch = useDispatch();

  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);

    // notify other users that this user is typing something

    const receiver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };

    if (value.length === 1) {
      receiver.typing = true;
      socket.emit("typing", receiver);
    }
    if (value.length === 0) {
      receiver.typing = false;
      socket.emit("typing", receiver);
    }
  };

  const handleKeyDown = (e, imageUpload) => {
    if (e.key === "Enter") sendMessage(imageUpload);
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? "image" : "text",
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };
    socket.emit("message", msg);

    setMessage("");
    setImage("");
    setShowEmojiPicker(false);
  };

  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append("id", chat.id);
    formData.append("image", image);

    ChatService.uploadImage(formData)
      .then((image) => {
        console.log("send message ", image);
        sendMessage(image.url);
      })
      .catch((err) => console.log(err));
  };

  const selectEmoji = (emoji) => {
    const startPosition = msgInput.current.selectionStart;
    const endPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;
    setMessage(
      value.substring(0, startPosition) +
        emoji.native +
        value.substring(endPosition, value.length)
    );
    msgInput.current.focus();
    msgInput.current.selectionEnd = endPosition + emojiLength;
  };

  useEffect(() => {
    const msgBox = document.getElementById("msg-box");
    if (
      !newMessage.seen &&
      newMessage.chatId === chat.id &&
      msgBox.scrollHeight !== msgBox.clientHeight
    ) {
      if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
        dispatch(incrementalScroll());
      } else {
        setShowNewMessageNotification(true);
      }
    } else {
      setShowNewMessageNotification(false);
    }
  }, [newMessage, dispatch]);

  const showNewMessage = () => {
    dispatch(incrementalScroll());
    setShowNewMessageNotification(false);
  };

  return (
    <div id="input-container">
      <div id="image-upload-container">
        <div>
          {showNewMessageNotification ? (
            <div id="message-notification" onClick={showNewMessage}>
              <FontAwesomeIcon icon="bell" className="fa-icon" />
              <p className="m-0">new message</p>
            </div>
          ) : null}
        </div>

        <div id="image-upload">
          {image && image.name ? (
            <div id="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                onClick={handleImageUpload}
                icon="upload"
                className="fa-icon"
              />
              <FontAwesomeIcon
                onClick={() => setImage("")}
                icon="times"
                className="fa-icon"
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            onClick={() => fileUpload.current.click()}
            icon={["far", "image"]}
            className="fa-icon"
          />
        </div>
      </div>

      <div id="message-input">
        <input
          ref={msgInput}
          value={message}
          type="text"
          placeholder="Message..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          icon={["far", "smile"]}
          className="fa-icon"
        />
      </div>
      <input
        id="chat-image"
        ref={fileUpload}
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {showEmojiPicker && (
        <Picker
          title="Pick your emoji..."
          emoji="point_up"
          style={{ position: "absolute", bottom: "20px", right: "20px" }}
          onSelect={selectEmoji}
        />
      )}
    </div>
  );
};

export default MessageInput;
