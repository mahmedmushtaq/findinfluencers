import { LoadMoreMessagePayload, MessageType } from "./types";
import socketCon from "../Socket";
import { Subjects } from "../Subjects";
import CheckListener from "./CheckListener";

class Messages {
  constructor() {}

  sendMessage(payload: MessageType) {
    console.log(" ======== send message ======== ", payload);
    return new Promise((resolve, reject) => {
      socketCon.socket.emit(Subjects.SendMessage, payload, (payload) => {
        resolve(payload);
      });
    });
  }

  receivedMessage(cb: Function) {
    socketCon.socket?.on(Subjects.ReceivedMessage, (payload: MessageType) => {
      cb(payload);

      // acknowledgment
      socketCon.ack({
        subject: Subjects.ReceivedMessage,
        payload,
      });
    });
  }

  OffReceivingMessages() {
    socketCon.socket.off(Subjects.ReceivedMessage);
  }

  loadMessages(
    payload: LoadMoreMessagePayload,
    loggedInUserId: string,
    cb: Function
  ) {
    socketCon.socket?.emit(Subjects.LoadMessages, payload);
    new CheckListener(socketCon.socket, { id: loggedInUserId }).listen(
      Subjects.LoadMessagesListener,
      cb
    );
  }

  OffListeningMessages(loggedInUserId) {
    socketCon.socket.off(loggedInUserId);
  }
}

const messages = new Messages();
export default messages;
