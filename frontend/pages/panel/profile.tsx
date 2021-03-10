import React from "react";
import {
  Box,
  Styled,
  Select,
  Text,
  Input,
  Button,
  Spinner,
  Textarea,
} from "theme-ui";
import {
  InfluencerPanelProfilePlatform,
  ProtectedRouteHOC,
  InfluencerPanelCategoryItem,
  InfluencerPanelSelectedImages,
} from "../../src/common/components";
import { PanelLayout } from "../../src/common/layouts";
import {
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
} from "../../styles/commonStyle";
import { useToSetProfile } from "../../src/common/hooks";

const Profile = ({ user }) => {
  const {
    onSelected: onSelectedPlatformOrCategory,
    deletePlatform,
    changePlatformState,
    submitData,
    handleFileUpload,
    deleteSelectedCategory,
    state,
    platformList,
    categoriesList,
    err,
    loading,
    profileLoading,
    updateProfile,
    onChange,
  } = useToSetProfile(user);
  return (
    <PanelLayout bodyTopMargin={20}>
      <Box sx={{ width: standardShortWidthLaptop, margin: "auto" }}>
        {profileLoading ? (
          <Spinner />
        ) : (
          <Box>
            <Styled.h4>Profile Setup</Styled.h4>
            <Styled.h5>
              <Text mt={3} mb={3}>
                Select Your Pictures (4 pictures are required)
              </Text>
            </Styled.h5>

            <Box mt={4} mb={4}>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
              />
            </Box>
            {/* typeof state.images[0] === "string " is used to check whether user is update the images or not */}
            {/* if user update then typeof will not equal to string */}
            {state.isProfileAlreadySet && typeof state.images[0] === "string" && (
              <Box mt={2} mb={2}>
                <InfluencerPanelSelectedImages images={state.images} />
              </Box>
            )}

            <Box mt={2} mb={2}>
              <Styled.h5>About You</Styled.h5>
              <Textarea
                cols={3}
                rows={3}
                name="description"
                sx={{ fontFamily: "roboto" }}
                placeholder="Explain about you(min 250 words required)"
                value={state.description}
                onChange={onChange}
              />
            </Box>

            <Styled.h5>Select Your Platform</Styled.h5>
            <Select
              name="selectedPlatform"
              onChange={onSelectedPlatformOrCategory}
            >
              <option value="">Select Platforms</option>
              {platformList.map((platform) => (
                <option
                  value={platform.id + "$" + platform.name}
                  key={platform.id}
                >
                  {platform.name}
                </option>
              ))}
            </Select>

            {state.selectedPlatform.map((platform, i) => (
              <InfluencerPanelProfilePlatform
                deletePlatform={deletePlatform}
                key={platform.platform.id}
                setState={changePlatformState}
                platform={platform}
              />
            ))}

            <Box>
              <Styled.h5>Select Your Category</Styled.h5>
              <Select name="category" onChange={onSelectedPlatformOrCategory}>
                <option value="">Select Category</option>
                {categoriesList.map((category) => (
                  <option
                    key={category.id}
                    value={category.id + "$" + category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </Select>
            </Box>

            {state.category &&
              state.category.map((singleCategory) => (
                <InfluencerPanelCategoryItem
                  key={singleCategory.id}
                  category={singleCategory}
                  deleteSelectedCategory={deleteSelectedCategory}
                />
              ))}

            <Button
              mt={2}
              onClick={state.isProfileAlreadySet ? updateProfile : submitData}
              sx={{
                borderBottomLeftRadius: [borderBottomLeftRadiusMobile],
                ":focus": {
                  outline: "none",
                },
              }}
            >
              <Text sx={{ fontSize: 2, fontFamily: "gilroyBold" }}>
                {!state.isProfileAlreadySet ? "Set Profile" : "Update Profile"}
              </Text>
              {/* show loading when user enter or update the details and submit it */}
            </Button>
            {loading && <Spinner />}
            <Text mt={3} color="primary">
              {err}
            </Text>
          </Box>
        )}
      </Box>
    </PanelLayout>
  );
};

export default ProtectedRouteHOC(Profile);
