import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

export enum OrderStatus {
  require_payment = "require_payment",
  needs_approval = "needs_approval",
  working = "working",
  rejected = "rejected",
  submit_for_payment = "submit_for_payment",
  completed = "completed",
  cancelled = "cancelled", // only cancelled by owner
}

interface OrderAttrs {
  name: string;
  description?: string;
  status: OrderStatus;
  ownerId: string;
  workingUserId: string;
  amount: number;
  platformProfileId: string;
}

// an interface that describe
//the properties of the usermodel

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

export interface OrderDoc extends mongoose.Document, OrderAttrs {}

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    platformProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plaform-profile",
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("order", orderSchema);

export { Order };
