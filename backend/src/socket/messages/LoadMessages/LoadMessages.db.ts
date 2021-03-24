import { Message } from "../../../models";
import { LoadMessagesTypes } from "./LoadMessagesTypes";

class LoadMessagesDB {
  private _LIMIT_MSG = 10;
  async loadNewMessages(payload: LoadMessagesTypes) {
    if (!payload.lastDateMsgDate) {
      const messages = await Message.find({
        conversationId: payload.conversationId,
      })
        .sort({ date: -1 })
        .limit(this._LIMIT_MSG);
      return messages;
    }

    const messages = await Message.find({
      conversationId: payload.conversationId,
      date: {
        $gt: payload.lastDateMsgDate,
        $lte: Date.now(),
      },
    });

    return messages;
  }
}

export default LoadMessagesDB;
