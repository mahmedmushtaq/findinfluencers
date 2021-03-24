import { Conversation, Message, Status, User } from "../../../models";
import { SocketTypes } from "../../SocketType";
import { isUserLivePayloadType } from "./socketType";

class MessagesFeaturesDB {
  async loadAllConversations(loggedInUserId: string) {
    const conversation = await Conversation.find({
      $or: [{ fromId: loggedInUserId }, { toId: loggedInUserId }],
    })
      .populate("fromId", "email username full_name id")
      .populate("toId", "email username full_name id");

    return conversation;
  }

  async loadOfflineMessages(loggedInUserId: string) {
    const messages = await Message.find({ toId: loggedInUserId, read: false });
    return messages;
  }

  async readAllOfflineMessages(messages: any) {
    // set read=true
    messages.map(async (singleMsg: { id: string }) => {
      const res = await Message.findOne({ _id: singleMsg.id });
      if (res) {
        res.read = true;
        await res.save();
      }
    });
  }

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

  async getConversationId(userId: string, loggedInUserId: string) {
    console.log("user Id is = ", userId, "loggedIn ", loggedInUserId);
    const conversation = await Conversation.findOne({
      $or: [
        { fromId: userId, toId: loggedInUserId },
        { fromId: loggedInUserId, toId: userId },
      ],
    });
    return conversation;
  }
}

export default MessagesFeaturesDB;
