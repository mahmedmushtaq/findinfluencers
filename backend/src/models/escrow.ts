import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

export enum EscrowStatus {
  company_holds = "company_holds", // amount in escrow
  company_holds_for_five_days = "company_holds_for_five_days", // Company Holds
  dispute = "dispute",
  paid = "paid", // Balance
}

interface EscrowAttrs {
  orderId: string;
  status: EscrowStatus;
  ownerId: string;
  workingUserId: string;
  updatedAt?: string;
}

// an interface that describe
//the properties of the usermodel

interface EscrowModel extends mongoose.Model<EscrowDoc> {
  build(attrs: EscrowAttrs): EscrowDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface EscrowDoc extends mongoose.Document, EscrowAttrs {}

const escrowSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    workingUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    ...transformMongooseResponse,
    timestamps: true,
  }
);

escrowSchema.statics.build = (attrs: EscrowAttrs) => {
  return new Escrow(attrs);
};

const Escrow = mongoose.model<EscrowDoc, EscrowModel>("escrow", escrowSchema);

export { Escrow };
