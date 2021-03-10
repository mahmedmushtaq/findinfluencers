import { ApolloError, IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Category, Platform, Profile, PlatformProfile } from "../../models";
import { User, UserRole } from "../../models/user";
import { contextType } from "../../types/apolloContextType";
import { addProfileInfoController } from "../controllers/profileController/profileController";
import { searchProfileController } from "../controllers/profileController/profileSearchController";
import {
  updateInputProfileInfo,
  updateProfileImages,
  deletePlatformInfo,
} from "../controllers/profileController/updateProfileController";

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
    profileRates: async () => {
      // $group: {
      //   max: { $max: "price" },
      //   min: { $min: "price" },
      // },
      const rateRangePlatformProfile = await PlatformProfile.aggregate([
        {
          $group: {
            _id: null,
            max: { $max: "$rate" },
            min: { $min: "$rate" },
          },
        },
      ]);

      const max = rateRangePlatformProfile[0].max;
      const min = rateRangePlatformProfile[0].min;
      return {
        rateRange: [min, max],
      };
    },

    searchProfile: async (_, { input, pageNum }) => {
      console.log("pageNum is = ", pageNum);
      //   const { platformName, categoryName, rateRange } = input;
      const profile = await searchProfileController(input, pageNum);
      return profile;
    },

    userProfile: async (_, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new ApolloError("No User Is Found");
      }

      const profile = await Profile.findOne({ userId: user.id });
      return profile;
    },
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

        if (images) {
          await updateProfileImages(images, context);
        }

        profile = updateInputProfileInfo(input, context);

        return profile;
      }
    ),

    deletePlatformProfile: authenticated(
      async (_: void, { id }: any, context: contextType) => {
        const profile = await deletePlatformInfo(id, context);
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
      const profilePlatformInfo = await PlatformProfile.find({
        _id: parent.platformProfileIds,
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
