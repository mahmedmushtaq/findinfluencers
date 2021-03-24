import { SocketTypes } from "../../SocketType";
import { Subjects } from "../../Subjects";
import LoadMessagesDB from "./LoadMessages.db";
import { LoadMessagesTypes } from "./LoadMessagesTypes";

class LoadMessages {
  private _db: LoadMessagesDB;
  constructor(private _socket: SocketTypes) {
    this._db = new LoadMessagesDB();
    this.loadNewMsges();
  }

  loadNewMsges() {
    this._socket.on(
      Subjects.LoadMessages,
      async (payload: LoadMessagesTypes) => {
        console.log("payload is = ", payload);
        const messages = await this._db.loadNewMessages(payload);
        this._socket.emit(this._socket.user!.id, {
          subject: Subjects.LoadMessagesListener,
          payload: messages,
        });
      }
    );
  }
}

export default LoadMessages;
