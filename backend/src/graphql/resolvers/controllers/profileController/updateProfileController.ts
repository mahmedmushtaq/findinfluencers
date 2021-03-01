import { Profile, ProfilePlatform } from "../../../../models";
import { contextType } from "../../../../types/apolloContextType";
import path from "path";
import fs from "fs";
import { saveFile } from "../../../../utils";

export const updateInputProfileInfo = async (
  input: any,
  context: contextType
) => {
  // update only category and platform Info
  // first check either profile is present or not

  const profile = await Profile.findOne({ userId: context.user.id });
  if (!profile) return;

  const profilePlatformIdsMap = input.platform.map(
    async ({
      profilePlatformId,
      profileName,
      profileUrl,
      profileFollowers,
    }: {
      profilePlatformId: string;
      profileName: string;
      profileUrl: string;
      profileFollowers: number;
    }) => {
      const profilePlatform = await ProfilePlatform.findOne({
        _id: profilePlatformId,
        userId: context.user.id, // must be the same user who has this profile
      });

      if (!profilePlatform) return;

      if (
        profilePlatform.profileName === profileName &&
        profilePlatform.profileUrl === profileUrl &&
        profilePlatform.profileFollowers === profileFollowers
      )
        return profilePlatform;

      profilePlatform!.profileName = profileName;
      profilePlatform.profileUrl = profileUrl;
      profilePlatform.profileFollowers = profileFollowers;

      await profilePlatform.save();
      return profilePlatform;
    }
  );

  await Promise.all(profilePlatformIdsMap);

  const { categoriesIds } = input;
  if (categoriesIds) {
    profile.categoryIds = categoriesIds;

    await profile.save();
  }
  return profile;
};

export const updateProfileImages = async (
  images: string[],
  context: contextType
) => {
  const profile = await Profile.findOne({ userId: context.user.id });

  if (!profile) return;
  //delete all images first
  profile.images.map((singleImage) => {
    const imageName = path.basename(singleImage);
    fs.unlink(
      path.join(
        __dirname,
        `../../../../public/images/profilePlatformPics/${imageName}`
      ),
      (err: any) => {}
    );
  });

  const allImages = await Promise.all(images);

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

  profile.images = imagesUrls;
  await profile.save();

  return profile;
};
