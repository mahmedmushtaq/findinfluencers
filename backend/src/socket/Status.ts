import { SocketTypes } from "./SocketType";
import { Status as UserStatus } from "../models";

class Status {
  constructor(private _socket: SocketTypes) {}
  live() {
    this.setStatus(this._socket!.user!.id, "online");
  }

  offline() {
    this.setStatus(this._socket!.user!.id, "offline");
  }

  private async setStatus(userId: string, status: "online" | "offline") {
    let userStatus = await UserStatus.findOne({ userId });
    if (!userStatus) {
      //@ts-ignore
      userStatus = UserStatus.build({ userId, status });
    }
    userStatus.status = status;

    userStatus.date = Date.now();
    await userStatus.save();
  }
}

export default Status;
