import { Category, Platform, PlatformProfile, Profile } from "../../../models";

export const searchProfileController = async (input: any, pageNum: number) => {
  const { platformName, rateRange, categoryName } = input;

  const limit = 10;

  let platform;
  if (platformName !== "any") {
    // find platformId by platformName
    platform = await Platform.findOne({ name: platformName });
  }

  //  specific platform, categoryName and rateRange profile is required
  const platformProfiles = await PlatformProfile.find({
    $and: [
      rateRange.length > 0
        ? {
            rate: { $lte: +rateRange[1], $gte: +rateRange[0] },
          }
        : {},
      platform
        ? {
            platformId: platform.id,
          }
        : {},
    ],
  })
    .select("_id")
    .skip(pageNum * limit)
    .limit(limit);

  // pP === platformProfile
  const platformProfileIds = platformProfiles.map((pP) => pP._id);
  const findCategoryIdByCategoryName = await Category.findOne({
    name: categoryName,
  });

  const prof = await Profile.find({
    $and: [
      {
        platformProfileIds: {
          $in: platformProfileIds,
        },
      },
      categoryName !== "any"
        ? {
            categoryIds: {
              $in: [findCategoryIdByCategoryName?._id],
            },
          }
        : {},
    ],
  });
  // .skip(pageNum * limit)
  // .limit(limit);

  return prof;
};
