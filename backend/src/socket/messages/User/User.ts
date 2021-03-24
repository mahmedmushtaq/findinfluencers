import { SocketTypes } from "../../SocketType";
import { Subjects } from "../../Subjects";
import MessagesFeaturesDB from "../features/MessagesFeatures.db";
import UserDB from "./User.db";

class User {
  private _db: UserDB;
  private _messagesFeaturesDB: MessagesFeaturesDB;
  constructor(private _socket: SocketTypes) {
    this._db = new UserDB();
    this.userInfoByUsername();
    this._messagesFeaturesDB = new MessagesFeaturesDB();
  }

  userInfoByUsername() {
    this._socket.on(
      Subjects.UserInfoByUsername,
      async (payload: { username: string }) => {
        const user = await this._db.userInfoByUsername(payload.username);
        if (user) {
          const conversation = await this._messagesFeaturesDB.getConversationId(
            user.id,
            this._socket.user!.id
          );
          this._socket.emit(this._socket.user!.id, {
            subject: Subjects.UserInfoByUsernameListener,

            payload: {
              // @ts-ignore
              ...user._doc,
              id: user.id,
              conversationId: conversation?.id,
            },
          });
        }
      }
    );
  }
}

export default User;
