import { platform } from "os";
import React from "react";
import { useState } from "react";
import { Box, Styled, Select, Text, Input, Button } from "theme-ui";
import { InfluencerPanelProfilePlatform } from "../../src/common/components";
import { PanelLayout } from "../../src/common/layouts";
import {
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
} from "../../styles/commonStyle";

const Profile = () => {
  const [state, setState] = useState({ category: [], selectedPlatform: [] });
  const [otherPlatformName, setOtherPlatformName] = useState({
    show: false,
    value: "",
  });

  const onChangePlatform = (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const value = e.target.value;
    if (e.target.name === "selectedPlatform") {
      if (value === "other") {
        setOtherPlatformName({ show: true, value: "" });
        return;
      }
      setPlatform(e.target.name, e.target.value);
      return;
    } else if (e.target.name === "otherplatform") {
      setOtherPlatformName({ show: true, value: e.target.value });
      return;
    }

    const filterCategory = state.category.filter(
      (singleCa) => singleCa !== e.target.value
    );

    setState({ ...state, category: [...filterCategory, e.target.value] });
  };

  const submitData = () => {
    console.log("state is = ", state);
  };

  const setStateFunc = (param: {
    platformName: string;
    name: string;
    value: string;
  }) => {
    state[param.platformName] = {
      ...state[param.platformName],
      [param.name]: param.value,
    };

    setState({ ...state });
  };

  const clearAllPlatform = () => {
    setState({ category: [...state.category], selectedPlatform: [] });
    setOtherPlatformName({ show: false, value: "" });
  };

  const deletePlatform = (platformName: string) => {
    delete state[platformName];
    const filterSelectedPlatform = state.selectedPlatform.filter(
      (value) => value !== platformName
    );
    setState({ ...state, selectedPlatform: filterSelectedPlatform });
  };

  const addOtherPlatform = () => {
    if (otherPlatformName.value.length > 0)
      setPlatform("selectedPlatform", otherPlatformName.value);
  };

  const setPlatform = (name: string, value: string) => {
    const filterDuplicate = state.selectedPlatform.filter(
      (filterValue) => filterValue !== value
    );
    setState({
      ...state,
      [name]: [...filterDuplicate, value],
    });
  };

  return (
    <PanelLayout bodyTopMargin={20}>
      <Box sx={{ width: standardShortWidthLaptop, margin: "auto" }}>
        <Styled.h4>Profile Setup</Styled.h4>
        <Styled.h5>
          <Text mt={3} mb={3}>
            Select Your Pictures (3 pictures are required)
          </Text>
        </Styled.h5>

        <Box mt={4} mb={4}>
          <Input type="file" accept="image/*" multiple />
        </Box>

        <Styled.h5>Select Your Platform</Styled.h5>
        <Select name="selectedPlatform" onChange={onChangePlatform}>
          <option>Instagram</option>
          <option>TikTok</option>
          <option>Likee</option>
          <option>Mx Takatak</option>
          <option>Snap Video</option>
          <option>Medium</option>
          <option value="other">Other Platform</option>
        </Select>
        {otherPlatformName.show && (
          <Box mt={2} mb={2}>
            <Input
              name="otherplatform"
              onChange={onChangePlatform}
              value={otherPlatformName.value}
              placeholder="Enter Other Platform Name"
            />
            <Button
              mt={2}
              mb={2}
              sx={{ borderBottomLeftRadius: borderBottomLeftRadiusMobile }}
              onClick={addOtherPlatform}
            >
              Add Platform
            </Button>
          </Box>
        )}
        <Text
          color="primary"
          sx={{ fontSize: 11, cursor: "pointer" }}
          onClick={clearAllPlatform}
        >
          Clear All Platforms
        </Text>
        {state.selectedPlatform.map((platformName, i) => (
          <InfluencerPanelProfilePlatform
            deletePlatform={deletePlatform}
            key={platformName + i}
            platformName={platformName}
            setState={setStateFunc}
            state={state}
          />
        ))}

        <Box>
          <Styled.h5>Select Your Category</Styled.h5>
          <Select name="category" onChange={onChangePlatform}>
            <option>Artish</option>
            <option>Entertaining</option>
            <option>Dance</option>
            <option>Tutorial</option>
            <option>Information</option>
            <option>Food</option>
            <option>Writer</option>
            <option>Blogger</option>
            <option>Dancer</option>
          </Select>
        </Box>

        {state.category &&
          state.category.map((singleCategory) => <Text>{singleCategory}</Text>)}

        <Button
          mt={2}
          onClick={submitData}
          sx={{
            borderBottomLeftRadius: [borderBottomLeftRadiusMobile],
            ":focus": {
              outline: "none",
            },
          }}
        >
          <Styled.h5>Set Profile</Styled.h5>
        </Button>
      </Box>
    </PanelLayout>
  );
};

export default Profile;
