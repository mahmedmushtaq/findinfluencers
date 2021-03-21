import { SocketTypes } from "../SocketType";
import { MessagesFeatures } from "./features";
import { SendAndReceiveMessages } from "./sendAndReceive";

class Messages {
  constructor(private _socket: SocketTypes) {
    new MessagesFeatures(_socket);
    new SendAndReceiveMessages(_socket);
  }

  messages() {}
}

export default Messages;
