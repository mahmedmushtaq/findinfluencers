import { Box, Flex, Input, Styled, Text } from "theme-ui";
import React from "react";
import { X } from "react-feather";

const PanelProfilePlatformInfo = (props: {
  platformName: string;
  setState: Function;
  state: any;
  deletePlatform: Function;
}) => {
  const { platformName, setState, state, deletePlatform } = props;
  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({
      platformName,
      name: e.target.name.trim(),
      value: e.target.value.trim(),
    });
  };

  return (
    <Box mt={3} mb={3}>
      <Flex sx={{ justifyContent: "space-between" }}>
        <Styled.h5>{platformName}</Styled.h5>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => deletePlatform(platformName)}
        >
          <X />
        </Box>
      </Flex>
      <Input
        name={`platformName_${platformName}`}
        placeholder={`Your ${platformName} name`}
        value={state[`platformName_${platformName}`]}
        onChange={onChange}
      />
      <Input
        name={`platformUrl_${platformName}`}
        mt={3}
        placeholder={`Your ${platformName} profile url`}
        value={state[`platformUrl_${platformName}`]}
        onChange={onChange}
      />
      <Input
        mt={3}
        name={`platformFollowers_${platformName}`}
        type="number"
        min={1000}
        placeholder={`Your ${platformName} followers(min 1k required)`}
        value={state[`platformFollowers_${platformName}`]}
        onChange={onChange}
      />
    </Box>
  );
};
export default PanelProfilePlatformInfo;
