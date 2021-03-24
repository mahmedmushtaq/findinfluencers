import { SocketTypes } from "../../SocketType";
import { Subjects } from "../../Subjects";
import { MessageType } from "./types";
import SendAndReceiveMessagesDB from "./SendAndReceivedMessages.db";
import Ack from "../../Ack";

class SendAndReceiveMessages {
  private _db: SendAndReceiveMessagesDB;
  constructor(private _socket: SocketTypes) {
    this._db = new SendAndReceiveMessagesDB();
    this.send();
  }

  send() {
    this._socket.on(
      Subjects.SendMessage,
      async (payload: MessageType, callback: Function) => {
        let conversationId: any = payload.conversationId;
        if (!conversationId) {
          // new conversation will start, then send who document to
          conversationId = await this._db.addConversation(
            payload.fromId,
            payload.toId
          );
        }

        // save messages to db
        const message = await this._db.addMessage(
          typeof conversationId === "string"
            ? conversationId!
            : conversationId.id,
          payload
        );

        const sendData = { ...payload, id: message.id, conversationId };

        // return back with extra information like message unique id and and conversationId
        callback(sendData);

        console.log("message sent ", payload);
        this._socket.broadcast
          .to(payload.toId)
          .emit(Subjects.ReceivedMessage, sendData);
      }
    );

    // check  aknowledgment
    new Ack(this._socket).listen(
      Subjects.ReceivedMessage,
      async (payload: MessageType) => {
        console.log("ackowledgment ", payload);

        // sent message back to sender to tell them message has been sent
        await this._db.messageRead(payload?.id!);
      }
    );
  }
}

export default SendAndReceiveMessages;
