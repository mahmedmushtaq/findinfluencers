import { SocketTypes } from "../SocketType";
import { MessagesFeatures } from "./features";
import LoadMessages from "./LoadMessages/LoadMessages";
import { SendAndReceiveMessages } from "./sendAndReceive";

class Messages {
  constructor(private _socket: SocketTypes) {
    new MessagesFeatures(_socket);
    new SendAndReceiveMessages(_socket);
    new LoadMessages(_socket);
  }

  messages() {}
}

export default Messages;
