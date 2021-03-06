import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_PROFILE_INFO,
  LOAD_PROFILE_PLATFORMS_AND_CATEGORIES,
} from "../../../lib/graphql";
import Router from "next/router";
import useToProfileHandler from "./useToProfileHandler";
import useToSubmitData from "./useToSubmitData";

const useToSetProfile = ({ token }) => {
  const [state, setState] = useState({
    isProfileAlreadySet: false,
    category: [],
    selectedPlatform: [],
    images: [],
  });

  const [err, setErr] = useState<any>();
  const basicContext = {
    context: {
      headers: {
        authorization: token,
      },
    },
  };

  const {
    handleFileUpload,
    deleteSelectedCategory,
    deletePlatform,
    changeState,
    onSelected,
  } = useToProfileHandler({ token, state, setState, setErr });

  const { submitData, updateProfile, loading } = useToSubmitData({
    state,
    token,
    setErr,
  });

  const [platformList, setPlatformList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const { data, loading: profileLoading } = useQuery(
    LOAD_PROFILE_PLATFORMS_AND_CATEGORIES,
    {
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      ...basicContext,
    }
  );

  useEffect(() => {
    if (data) {
      console.log("data is = ", data);
      setPlatformList(data.platforms);
      setCategoriesList(data.categories);
      if (data.myProfile) {
        // if profile is already present then insert profile info into state
        //@ts-ignore
        setState({
          isProfileAlreadySet: true,
          category: JSON.parse(JSON.stringify(data.myProfile.category)),
          selectedPlatform: JSON.parse(
            JSON.stringify(data.myProfile.platformProfileInfo)
          ),
          images: JSON.parse(JSON.stringify(data.myProfile.images)),
        });
      }
    }
  }, [data]);

  // useEffect(() => {
  //   if (error) {
  //     setErr(error.message);
  //   }
  // }, [error]);

  return {
    state,
    onSelected,
    deletePlatform,
    changeState,
    submitData,
    handleFileUpload,
    err,
    platformList,
    categoriesList,
    loading,
    profileLoading,
    deleteSelectedCategory,
    updateProfile,
  };
};

export default useToSetProfile;
