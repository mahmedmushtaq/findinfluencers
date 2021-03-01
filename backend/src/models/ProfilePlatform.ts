import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";



interface ProfilePlatformAttrs {
  platformId: string;
  profileName: string;
  profileUrl: string;
  profileFollowers: number;
  userId: string;
}

interface ProfilePlatformModel extends mongoose.Model<ProfilePlatformDoc> {
  build(attrs: ProfilePlatformAttrs): ProfilePlatformDoc;
}

interface ProfilePlatformDoc extends mongoose.Document, ProfilePlatformAttrs {}

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
  },
  transformMongooseResponse
);

profilePlatformSchema.statics.build = (attrs: ProfilePlatformAttrs) => {
  return new ProfilePlatform(attrs);
};

const ProfilePlatform = mongoose.model<
  ProfilePlatformDoc,
  ProfilePlatformModel
>("profile-plaform", profilePlatformSchema);

export { ProfilePlatform };
