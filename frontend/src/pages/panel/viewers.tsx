import { Box, Grid, Styled, Flex, Text } from "theme-ui";

import { PanelLayout } from "../../common/layouts";
const Viewer = () => {
  return (
    <PanelLayout>
      <Box>
        <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
          <Styled.h2>No of Viewers</Styled.h2>
          <Styled.h4>
            <Text ml={3} color="primary">
              5
            </Text>
          </Styled.h4>
        </Flex>
        <Text sx={{ textAlign: "center" }}>
          It shows how many visitors have seen your profile
        </Text>
      </Box>
    </PanelLayout>
  );
};

export default Viewer;
