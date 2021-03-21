import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface StatusAttrs {
  userId: string;
  status: string;
  date: number;
}

interface StatusModel extends mongoose.Model<StatusDoc> {
  build(attrs: StatusAttrs): StatusDoc;
}

interface StatusDoc extends mongoose.Document, StatusAttrs {}

const statusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      default: () => Date.now(),
    },
  },
  transformMongooseResponse
);

statusSchema.statics.build = (attrs: StatusAttrs) => {
  return new Status(attrs);
};

const Status = mongoose.model<StatusDoc, StatusModel>("status", statusSchema);

export { Status };
