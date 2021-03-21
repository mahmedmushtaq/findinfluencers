import { MessageType } from "./types";
import socketCon from "../Socket";
import { Subjects } from "../Subjects";

class Messages {
  constructor() {}

  sendMessage(payload: MessageType) {
    console.log("send ", payload);
    socketCon.socket.emit(Subjects.SendMessage, payload);
  }

  receivedMessage(cb: Function) {
    socketCon.socket?.on(Subjects.ReceivedMessage, (payload: MessageType) => {
      console.log("received messages listening1 ");
      cb(payload);
    });
  }

  OffReceivingMessages() {
    socketCon.socket.off(Subjects.ReceivedMessage);
  }
}

const messages = new Messages();
export default messages;
