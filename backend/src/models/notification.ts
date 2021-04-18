import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface NotificationAttrs {
  fromUserId: string;
  toUserId: string;
  message: string;
  link: string;
  read?: boolean;
  createdAt?: string;
  opened?: boolean;
}

// an interface that describe
//the properties of the usermodel

interface NotificationModel extends mongoose.Model<NotificationDoc> {
  build(attrs: NotificationAttrs): NotificationDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface NotificationDoc extends mongoose.Document, NotificationAttrs {}

const notificationSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: () => false,
    },
    opened: {
      type: Boolean,
      default: () => false,
    },
  },
  {
    ...transformMongooseResponse,
    timestamps: { createdAt: true, updatedAt: false },
  }
);

notificationSchema.statics.build = (attrs: NotificationAttrs) => {
  return new Notification(attrs);
};

const Notification = mongoose.model<NotificationDoc, NotificationModel>(
  "notification",
  notificationSchema
);

export { Notification };
