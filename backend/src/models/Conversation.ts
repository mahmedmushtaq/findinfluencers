import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface ConversationAttrs {
  fromId: string;
  toId: string;
}

// an interface that describe
//the properties of the usermodel

interface ConversationModel extends mongoose.Model<ConversationDoc> {
  build(attrs: ConversationAttrs): ConversationDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface ConversationDoc extends mongoose.Document, ConversationAttrs {}

const conversationSchema = new mongoose.Schema(
  {
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
  },
  transformMongooseResponse
);

conversationSchema.statics.build = (attrs: ConversationAttrs) => {
  return new Conversation(attrs);
};

const Conversation = mongoose.model<ConversationDoc, ConversationModel>(
  "conversation",
  conversationSchema
);

export { Conversation };
