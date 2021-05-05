import { Box, Flex, Input, Styled, Text } from "theme-ui";
import React from "react";
import { X } from "react-feather";

interface PropsType {
  setState: Function;
  platform: {
    profileName: string;
    profileUrl: string;
    profileFollowers: string;
    rate: string;
    platform: { id: string; name: string };
  };
  deletePlatform: Function;
}

const PanelProfilePlatformInfo = (props: PropsType) => {
  const { platform, setState, deletePlatform } = props;
  const onChange = (
    e: React.ChangeEvent<{ name: string; value: string | number }>,
    isNumebr?: boolean
  ) => {
    setState({
      platform,
      name: e.target.name,
      value: isNumebr ? +e.target.value : e.target.value,
    });
  };

  const platformProfileRate = platform.rate
    ? +platform.rate < 5
      ? 10
      : platform.rate
    : 5;

  const platformInfo = `Your ${platform.platform.name} `;
  return (
    <Box mt={3} mb={3}>
      <Flex
        sx={{ justifyContent: "space-between", textTransform: "capitalize" }}
      >
        <Styled.h5>{platform.platform.name}</Styled.h5>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => deletePlatform(platform)}
        >
          <X />
        </Box>
      </Flex>
      <Input
        name={`profileName`}
        placeholder={`${platformInfo} name`}
        value={platform.profileName}
        onChange={onChange}
      />
      <Input
        name={`profileUrl`}
        mt={3}
        placeholder={`${platformInfo} profile url`}
        value={platform.profileUrl}
        onChange={onChange}
      />
      <Box mt={1}>
        ${" "}
        <Input
          mt={3}
          name={`rate`}
          type="number"
          min={3}
          placeholder={`${platformInfo} Rate(e.g $15/hr)`}
          value={platformProfileRate}
          onChange={(e) => onChange(e, true)}
        />
        (Per Project Price)
      </Box>
      <Input
        mt={3}
        name={`profileFollowers`}
        type="number"
        min={1000}
        placeholder={`${platformInfo} followers(min 1k required)`}
        value={platform.profileFollowers}
        onChange={(e) => onChange(e, true)}
      />
      (no of followers)
    </Box>
  );
};
export default PanelProfilePlatformInfo;
