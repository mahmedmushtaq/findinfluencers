import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface ProfileAttrs {
  categoryIds: string[]; // unique id
  profilePlatformIds: string[];
  userId: string;
  images: string[];
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document, ProfileAttrs {}

const profileSchema = new mongoose.Schema(
  {
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "category",
      },
    ], // unique id
    profilePlatformIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile-plaform",
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  transformMongooseResponse
);

profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile(attrs);
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  "profile",
  profileSchema
);

export { Profile };
