import { Box, Flex, Input, Styled, Text } from "theme-ui";
import React from "react";
import { X } from "react-feather";

interface PropsType {
  setState: Function;
  platform: {
    profileName: string;
    profileUrl: string;
    profileFollowers: string;
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

  return (
    <Box mt={3} mb={3}>
      <Flex sx={{ justifyContent: "space-between" }}>
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
        placeholder={`Your ${platform.platform.name} name`}
        value={platform.profileName}
        onChange={onChange}
      />
      <Input
        name={`profileUrl`}
        mt={3}
        placeholder={`Your ${platform.platform.name} profile url`}
        value={platform.profileUrl}
        onChange={onChange}
      />
      <Input
        mt={3}
        name={`profileFollowers`}
        type="number"
        min={1000}
        placeholder={`Your ${platform.platform.name} followers(min 1k required)`}
        value={platform.profileFollowers}
        onChange={(e) => onChange(e, true)}
      />
    </Box>
  );
};
export default PanelProfilePlatformInfo;
