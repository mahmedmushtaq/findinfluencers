import { Profile, PlatformProfile } from "../../../../models";
import { contextType } from "../../../../types/apolloContextType";
import { saveFile } from "../../../../utils";

export const addProfileInfoController = async (
  input: any,
  images: any,
  context: contextType
) => {
  const allImages = await Promise.all(images[0]);

  const isProfilePresent = await Profile.findOne({ userId: context.user.id });
  if (isProfilePresent) return isProfilePresent;

  const platformProfileIdsMap = input.platforms.map(
    async ({
      platformId,
      profileName,
      profileUrl,
      profileFollowers,
    }: {
      platformId: string;
      profileName: string;
      profileUrl: string;
      profileFollowers: number;
    }) => {
      const profilePlatform = await PlatformProfile.build({
        userId: context.user.id,
        platformId,
        profileName,
        profileUrl,
        profileFollowers,
      });

      await profilePlatform.save();
      return profilePlatform.id;
    }
  );

  const platformProfileIds: string[] = await Promise.all(platformProfileIdsMap);

  //@ts-ignore
  const imagesPathMap = allImages.map(async (singleImage: File) => {
    const fileData = await saveFile(
      [__dirname, "../../../../public/images/profilePlatformPics/"],
      singleImage
    );
    //@ts-ignore
    const dbPath = `/public/images/profilePlatformPics/${fileData.filename}`;

    return dbPath;
  });

  const imagesUrls = await Promise.all(imagesPathMap);

  const { categoryIds } = input;

  const profile = await Profile.build({
    categoryIds,
    platformProfileIds: platformProfileIds,
    userId: context.user.id,
    images: imagesUrls,
  });

  await profile.save();

  return profile;
};
