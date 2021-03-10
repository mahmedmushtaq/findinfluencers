import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface PlatformProfileAttrs {
  platformId: string;
  profileName: string;
  profileUrl: string;
  profileFollowers: number;
  userId: string;
  rate: number;
}

interface PlatformProfileModel extends mongoose.Model<PlatformProfileDOc> {
  build(attrs: PlatformProfileAttrs): PlatformProfileDOc;
}

interface PlatformProfileDOc extends mongoose.Document, PlatformProfileAttrs {}

const profilePlatformSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    platformId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
      required: true,
    },
    profileName: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      required: true,
    },
    profileFollowers: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  transformMongooseResponse
);

profilePlatformSchema.statics.build = (attrs: PlatformProfileAttrs) => {
  return new PlatformProfile(attrs);
};

const PlatformProfile = mongoose.model<
  PlatformProfileDOc,
  PlatformProfileModel
>("plaform-profile", profilePlatformSchema);

export { PlatformProfile };
