import { IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { PlatformProfile } from "../../models";
import { Platform } from "../../models/platform";
import { UserRole } from "../../models/user";
import { saveFile } from "../../utils/utils";

const platformResolver: IResolvers = {
  Query: {
    platforms: async () => {
      const platforms = await Platform.find({});
      return platforms;
    },
    platform: async (_, { name }) => {
      const platform = await Platform.findOne({ name });
      return platform;
    },
  },
  Mutation: {
    addPlatform: authenticated(
      authorized(UserRole.admin, async (_: void, { input }: any) => {
        const { name, icon } = input;

        let platform = await Platform.findOne({ name });
        if (platform) return platform;

        platform = Platform.build({ name, icon });
        await platform.save();
        return platform;
      })
    ),
    addPlatformWithIcon: authenticated(
      authorized(UserRole.admin, async (_: void, { input, file }: any) => {
        // needs implementation

        const fileData = await saveFile(
          [__dirname, "../../public/images/platformPics/"],
          file
        );
        //@ts-ignore
        const dbPath = `/public/images/platformPics/${fileData.filename}`;
        const platform = Platform.build({
          name: input.name,
          icon: dbPath,
        });

        await platform.save();

        return platform;
      })
    ),
  },
  Platform: {
    async platformProfileInfo(parent) {
      const id = parent.id;
      //fetch all data
      const profilePlatform = await PlatformProfile.find({ platformId: id });
      return profilePlatform;
    },
  },
};

export default platformResolver;
