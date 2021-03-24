import { SocketTypes } from "../../SocketType";
import { Subjects } from "../../Subjects";
import MessagesFeaturesDB from "./MessagesFeatures.db";
import { getConversationIdType, isUserLivePayloadType } from "./socketType";

class MessagesFeaturesSocket {
  private _messagesFeaturesDB: MessagesFeaturesDB;
  constructor(private _socket: SocketTypes) {
    this._messagesFeaturesDB = new MessagesFeaturesDB();
    // check other user status, either live or offline
    this.isUserLive();
    this.getConversationId();
    // when users come back to online then send offline message back to client
    this.loadOfflineMessages();
    this.loadAllConversations();
  }
  async isUserLive() {
    this._socket.on(
      Subjects.IsUserLive,
      async (payload: isUserLivePayloadType) => {
        const status = await this._messagesFeaturesDB.isUserLive(payload);

        console.log("message received = ", this._socket.rooms);
        console.log(this._socket.user!.id);

        this._socket.emit(this._socket.user!.id.toString(), {
          subject: Subjects.IsUserLiveListener,
          ...payload,
          status,
        });
      }
    );
  }

  async loadOfflineMessages() {
    const messages = await this._messagesFeaturesDB.loadOfflineMessages(
      this._socket.user!.id
    );
    this._socket.emit(this._socket.user!.id, {
      subject: Subjects.LoadOfflineMessages,
      payload: messages,
    });
    // set read=true after sending message to the front end
    this._messagesFeaturesDB.readAllOfflineMessages(messages);
  }

  async loadAllConversations() {
    this._socket.on(Subjects.LoadConversationsList, async () => {
      console.log("load conversation ");
      const conversations = await this._messagesFeaturesDB.loadAllConversations(
        this._socket.user!.id
      );

      this._socket.emit(this._socket.user!.id, {
        subject: Subjects.LoadConversationsListListener,
        payload: conversations,
      });
    });
  }

  async getConversationId() {
    this._socket.on(
      Subjects.GetConversationId,
      async (payload: getConversationIdType) => {
        const conversation = await this._messagesFeaturesDB.getConversationId(
          payload.userId,
          payload.loggedInUserId
        );
        this._socket.emit(this._socket.user!.id, {
          subject: Subjects.GetConversationIdListener,
          payload: conversation?.id,
        });
      }
    );
  }
}

export default MessagesFeaturesSocket;
