import { Profile, PlatformProfile } from "../../../models";
import { contextType } from "../../../types/apolloContextType";
import path from "path";
import fs from "fs";
import { saveFile } from "../../../utils";
import util from "util";
const fileAccess = util.promisify(fs.access);
const fileUnlink = util.promisify(fs.unlink);

export const updateInputProfileInfo = async (
  input: any,
  context: contextType
) => {
  // update only category and platform Info
  // first check either profile is present or not

  const profile = await Profile.findOne({ userId: context.user.id });
  if (!profile) return;

  const profilePlatformIdsMap = input.platforms.map(
    async ({
      platformId,
      id,
      profileName,
      profileUrl,
      profileFollowers,
      rate,
    }: {
      platformId: string;
      id: string;
      profileName: string;
      profileUrl: string;
      profileFollowers: number;
      rate: number;
    }) => {
      let platformProfile = await PlatformProfile.findOne({
        _id: id,
        userId: context.user.id, // must be the same user who has this profile
      });

      if (
        platformProfile &&
        platformProfile.profileName === profileName &&
        platformProfile.profileUrl === profileUrl &&
        platformProfile.profileFollowers === profileFollowers &&
        platformProfile.rate === rate
      )
        return platformProfile;

      if (!platformProfile) {
        // create new one

        platformProfile = PlatformProfile.build({
          platformId,
          profileName,
          profileFollowers,
          profileUrl,
          userId: context.user.id,
          rate,
        });

        await platformProfile.save();

        return platformProfile;
      }

      platformProfile!.profileName = profileName;
      platformProfile.profileUrl = profileUrl;
      platformProfile.profileFollowers = profileFollowers;
      platformProfile.rate = rate;

      await platformProfile.save();

      return platformProfile;
    }
  );

  const platformProfileIds: string[] = await Promise.all(profilePlatformIdsMap);

  const { categoryIds, description } = input;
  if (categoryIds && categoryIds.length >= 1) {
    profile.categoryIds = categoryIds;
  }

  console.log("description is  ", description);
  profile.description = description;

  profile.platformProfileIds = platformProfileIds;

  await profile.save();
  // }

  return profile;
};

export const updateProfileImages = async (
  images: string[],
  context: contextType
) => {
  const profile = await Profile.findOne({ userId: context.user.id });
  if (!profile) return;
  //delete the old images first
  profile.images.map(async (singleImage) => {
    const imageName = path.basename(singleImage);

    try {
      const accessFile = await fileAccess(
        `public/images/profilePlatformPics/${imageName}`
      );

      const unlinkFile = await fileUnlink(
        `public/images/profilePlatformPics/${imageName}`
      );
      return unlinkFile;
    } catch (err) {
      return;
    }
  });

  const allImages = await Promise.all(images[0]);

  //@ts-ignore
  const imagesPathMap = allImages.map(async (singleImage: File) => {
    const fileData = await saveFile("images/profilePlatformPics/", singleImage);
    //@ts-ignore
    const dbPath = `/public/images/profilePlatformPics/${fileData.filename}`;

    return dbPath;
  });

  const imagesUrls = await Promise.all(imagesPathMap);

  console.log("images url ", imagesUrls);

  profile.images = imagesUrls;
  await profile.save();

  return profile;
};

// delete PlatformProfile
export const deletePlatformInfo = async (id: string, context: contextType) => {
  const profile = await Profile.findOne({ userId: context.user.id });
  //
  const remainingPlatforms: string[] = profile!.platformProfileIds.filter(
    (singleId) => singleId.toString() !== id
  );

  if (remainingPlatforms?.length === 0) {
    // at least one platform profile must be present

    return profile;
  }

  profile!.platformProfileIds! = remainingPlatforms;

  await profile?.save();
  // await PlatformProfile.findByIdAndDelete(id);

  return profile;
};
