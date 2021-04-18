import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface AmountAttrs {
  userId: string;
  amount: number;
  billed: number; // this property is only used by influencer
}

// an interface that describe
//the properties of the usermodel

interface AmountModel extends mongoose.Model<AmountDoc> {
  build(attrs: AmountAttrs): AmountDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface AmountDoc extends mongoose.Document, AmountAttrs {}

const amountSchema = new mongoose.Schema(
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
    billed: {
      type: Number,
      required: true,
    },
  },
  transformMongooseResponse
);

amountSchema.statics.build = (attrs: AmountAttrs) => {
  return new Amount(attrs);
};

const Amount = mongoose.model<AmountDoc, AmountModel>("amount", amountSchema);

export { Amount };
