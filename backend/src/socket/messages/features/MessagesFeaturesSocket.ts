import { SocketTypes } from "../../SocketType";
import { Subjects } from "../Subjects";
import MessagesFeaturesDB from "./MessagesFeaturesDB";
import { isUserLivePayloadType } from "./socketType";

class MessagesFeaturesSocket {
  private _messagesFeaturesDB: MessagesFeaturesDB;
  constructor(private _socket: SocketTypes) {
    this._messagesFeaturesDB = new MessagesFeaturesDB();
    // check other user status, either live or offline
    this.isUserLive();
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
}

export default MessagesFeaturesSocket;
