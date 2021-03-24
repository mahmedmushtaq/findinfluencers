import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface MessageAttrs {
  fromId: string;
  toId: string;
  read: boolean;
  date: number;
  body: string;
  conversationId: string;
}

// an interface that describe
//the properties of the usermodel

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface MessageDoc extends mongoose.Document, MessageAttrs {}

const messagesSchema = new mongoose.Schema(
  {
    // messageUniqueId: {
    //   type: String,
    //   require: true,
    // }, // this will be generated on the client side
    date: {
      type: Number,
      require: true,
    },
    body: {
      type: String,
      reuqire: true,
    },
    fromId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
    toId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    read: {
      type: Boolean,
      required: true,
    },

    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "converstation",
      required: true,
    },
  },
  transformMongooseResponse
);

messagesSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>(
  "message",
  messagesSchema
);

export { Message };
