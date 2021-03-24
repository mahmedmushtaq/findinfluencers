import { Conversation, User } from "../../../models";
import { SocketTypes } from "../../SocketType";
import { Subjects } from "../../Subjects";
import { Message } from "../../../models";
import { MessageType } from "./types";

class SendAndReceiveMessagesDB {
  // create a hashmaps
  private _conversationsList: any = {};
  constructor() {}

  async addMessage(conversationId: string, payload: MessageType) {
    const message = Message.build({
      ...payload,
      read: false,
      conversationId,
    });

    await message.save();
    return message;
  }

  async messageRead(messageId: string) {
    const message = await Message.findOne({ _id: messageId });
    if (!message) return;
    message.read = true;
    await message.save();
    return message;
  }

  async addConversation(fromId: string, toId: string) {
    //   update this logic by using redis
    // const key1 = fromId + "_" + toId;
    // const key2 = toId + "_" + fromId;
    // console.log("conversation list = ", this._conversationsList);
    // if (
    //   // first fromId start the conversation
    //   this._conversationsList[key1] ||
    //   // first toId start the conversation
    //   this._conversationsList[key2]
    // ) {
    //   console.log("conversation is already present");

    //   // user is already present in conversation
    //   return this._conversationsList[key1] || this._conversationsList[key2];
    // }

    let conversation = await Conversation.findOne({
      $or: [
        { $and: [{ fromId }, { toId }] },
        { $and: [{ fromId: toId }, { toId: fromId }] }, // other user first sent message to me
      ],
    });

    if (!conversation) {
      conversation = await Conversation.build({ fromId, toId });

      await conversation.save();
    }

    const fromUserInformation = await User.findOne({ _id: fromId }).select(
      "-password"
    );
    const toUserInformation = await User.findOne({ _id: toId }).select(
      "-password"
    );

    console.log("add conversation = ", conversation);

    return {
      id: conversation.id,
      fromId: fromUserInformation,
      toId: toUserInformation,
    };
    // const key = fromId + "_" + toId;
    // this._conversationsList = {
    //   ...this._conversationsList,
    //   [key]: conversation.id,
    // };

    // return this._conversationsList[key];

    // this.conversations?.push({ fromId, toId });
  }
}

export default SendAndReceiveMessagesDB;
