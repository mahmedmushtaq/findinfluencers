import { useMutation } from "@apollo/client";
import Router from "next/router";
import { useEffect } from "react";
import {
  ADD_PROFILE_INFO,
  DELETE_PLATFORM_PROFILE,
  UPDATE_PROFILE_INFO,
} from "../../../lib/graphql";

const useToSubmitData = ({ state, token, setErr }) => {
  const context = {
    context: {
      headers: {
        authorization: token,
      },
    },
  };
  const [
    addProfileInfo,
    { data: addProfileData, loading: addProfileInfoLoading },
  ] = useMutation(ADD_PROFILE_INFO, context);

  const [updateProfileInfo, { loading: updateProfileLoading }] = useMutation(
    UPDATE_PROFILE_INFO,
    context
  );

 

  let loading = !state.isProfileAlreadySet
    ? addProfileInfoLoading
    : updateProfileLoading;

  useEffect(() => {
    if (addProfileData) {
      Router.push("/panel");
    }
  }, [addProfileData]);

  // convert selectedPlatform object according to the schema of the graphql in order to submit data
  const platformObjectConversion = () => {
    return state.selectedPlatform.map((platform) => ({
      platformId: platform.platform.id,
      profileFollowers: +platform.profileFollowers,
      profileName: platform.profileName,
      profileUrl: platform.profileUrl,
      id: state.isProfileAlreadySet ? platform.id : null,
    }));
  };
  // convert selectedCategory object according to the schema of the graphql in order to submit data
  const categoryObjectConversion = () => {
    return state.category.map((category) => category.id);
  };

  const checkFieldIsEmpty = () => {
    if (
      state.selectedPlatform.length === 0 ||
      state.category.length === 0 ||
      state.images.length === 0
    ) {
      setErr("Please select Category, Platform and Images");
      return true;
    }
    let iterateComplete = true;
    // check all platform key values do not empty
    state.selectedPlatform.some((platform) => {
      for (let k in platform) {
        if (!platform[k]) {
          iterateComplete = false;
          setErr(
            "Platform ProfileName, ProfileUrl and Profile Followers are required"
          );
          return;
        }
      }
    });

    return !iterateComplete;
  };

  const submitData = async () => {
    setErr("");

    if (checkFieldIsEmpty()) return;

    const platformProfiles = platformObjectConversion();

    const categoryIds = categoryObjectConversion();

    try {
      await addProfileInfo({
        variables: {
          input: { platforms: platformProfiles, categoryIds },
          images: state.images,
        },
      });
    } catch (err) {
      setErr(err.message);
    }
  };

  const updateProfile = async () => {
    let images;
    // check whehter user update the images or not
    if (typeof state.images[0] !== "string") {
      // user update the images
      images = state.images;
    }

    if (checkFieldIsEmpty()) return;

    const platformProfiles = platformObjectConversion();

    const categoryIds = categoryObjectConversion();

    console.log(platformProfiles, categoryIds);

    try {
      await updateProfileInfo({
        variables: {
          input: { platforms: platformProfiles, categoryIds },
          images: images,
        },
      });
      Router.push("/panel");
    } catch (err) {
      setErr(err.message);
    }
  };
  return { submitData, updateProfile, loading };
};

export default useToSubmitData;
