import { Profile, ProfilePlatform } from "../../../../models";
import { contextType } from "../../../../types/apolloContextType";
import { saveFile } from "../../../../utils";

export const addProfileInfoController = async (
  input: any,
  images: any,
  context: contextType
) => {
  const allImages = await Promise.all(images);

  const profilePlatformIdsMap = input.platform.map(
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
      const profilePlatform = await ProfilePlatform.build({
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

  const profilePlatformIds: string[] = await Promise.all(profilePlatformIdsMap);

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
    profilePlatformIds,
    userId: context.user.id,
    images: imagesUrls,
  });

  await profile.save();

  return profile;
};


