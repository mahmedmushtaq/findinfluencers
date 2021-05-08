import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface AmountDeductionAttrs {
  amount: number;
  orderId: string;
  status: "account" | "withdrawl";
}

// an interface that describe
//the properties of the usermodel

interface AmountDeductionModel extends mongoose.Model<AmountDeductionDoc> {
  build(attrs: AmountDeductionAttrs): AmountDeductionDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface AmountDeductionDoc extends mongoose.Document, AmountDeductionAttrs {}

const amountDeduction = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
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

amountDeduction.statics.build = (attrs: AmountDeductionAttrs) => {
  return new AmountDeduction(attrs);
};

const AmountDeduction = mongoose.model<
  AmountDeductionDoc,
  AmountDeductionModel
>("amountDeduction", amountDeduction);

export { AmountDeduction };
