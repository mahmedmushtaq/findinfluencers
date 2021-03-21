import { SocketTypes } from "../../SocketType";
import { Subjects } from "../Subjects";
import { MessageType } from "./types";

class SendAndReceiveMessages {
  constructor(private _socket: SocketTypes) {
    this.send();
  }

  send() {
    this._socket.on(Subjects.SendMessage, (payload: MessageType) => {
      this._socket.broadcast
        .to(payload.toId)
        .emit(Subjects.ReceivedMessage,  payload);
    });
  }
}

export default SendAndReceiveMessages;
