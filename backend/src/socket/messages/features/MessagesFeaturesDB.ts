import { Status, User } from "../../../models";
import { SocketTypes } from "../../SocketType";
import { isUserLivePayloadType } from "./socketType";

class MessagesFeaturesDB {
  async isUserLive(payload: isUserLivePayloadType) {
    let userId: any = payload.userId;

    if (!userId) {
      userId = await User.findOne({ username: payload.username });
      // invalid username
      if (!userId) return "offline";

      userId = userId.id;
    }

    // this is used to check other user status either live or offline
    const status = await Status.findOne({ userId });
    if (!status) {
      return "offline";
    }

    return status.status;
  }
}

export default MessagesFeaturesDB;
