import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface WithDrawlRequestAttrs {
  userId: string;
  status: "paid" | "pending" | "dispute";
  amount: number;
}

// an interface that describe
//the properties of the usermodel

interface WithDrawlModel extends mongoose.Model<WithDrawlRequestDoc> {
  build(attrs: WithDrawlRequestAttrs): WithDrawlRequestDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface WithDrawlRequestDoc
  extends mongoose.Document,
    WithDrawlRequestAttrs {}

const withDrawlRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  transformMongooseResponse
);

withDrawlRequestSchema.statics.build = (attrs: WithDrawlRequestAttrs) => {
  return new WithDrawlRequest(attrs);
};

const WithDrawlRequest = mongoose.model<
  WithDrawlRequestDoc,
  WithDrawlModel
>("with_drawl_request", withDrawlRequestSchema);

export { WithDrawlRequest };
