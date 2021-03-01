import { IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Category, Platform, Profile, ProfilePlatform } from "../../models";
import { User, UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";
import { addProfileInfoController } from "./controllers/profileController/profileController";
import {
  updateInputProfileInfo,
  updateProfileImages,
} from "./controllers/profileController/updateProfileController";

const profileResolver: IResolvers = {
  Query: {
    myProfile: authenticated(
      async (_: void, _1: void, context: contextType) => {
        const profile = await Profile.findOne({ userId: context.user.id });
        // .populate("userId", "-password -v")
        // .populate("categoryIds")
        // .populate("profilePlatformIds");
        return profile;
      }
    ),
  },
  Mutation: {
    addProfileInfo: authenticated(
      authorized(
        UserRole.influencer,
        async (_: void, { input, images }: any, context: contextType) => {
          const profile = await addProfileInfoController(
            input,
            images,
            context
          );

          return profile;
        }
      )
    ),
    updateProfileInfo: authenticated(
      async (_: void, { input, images }: any, context: contextType) => {
        let profile;

        if (input && !images) {
          profile = await updateInputProfileInfo(input, context);

          // update only category, platformInfo not images
        } else if (!input && images) {
          profile = await updateProfileImages(images, context);
        }

        return profile;
      }
    ),
  },

  Profile: {
    user: async (parent) => {
      const user = await User.findById(parent.userId);

      return user;
    },
    platformProfileInfo: async (parent) => {
      const profilePlatformInfo = await ProfilePlatform.find({
        _id: parent.profilePlatformIds,
      });

      return profilePlatformInfo;
    },

    category: async (parent) => {
      const categoriesInfo = await Category.find({ _id: parent.categoryIds });
      return categoriesInfo;
    },
  },
  // field level resolver
  PlatformProfileInfo: {
    async platform(parent) {
      const platformId = parent.platformId;
      const platform = await Platform.findById(platformId);
      return platform;
    },
    async user(parent) {
      const userId = parent.userId;
      const user = await User.findById(userId);
      return user;
      // const userId = parent.userId
    },
  },
};

export default profileResolver;
