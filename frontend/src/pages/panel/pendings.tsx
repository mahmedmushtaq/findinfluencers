import { Box, Flex, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../common/layouts";

// pending projects
const PendingProjects = (props: { isBusinessPanel?: boolean }) => {
  return (
    <PanelLayout businessPanel={props.isBusinessPanel}>
      <Box>
        <Styled.h2>Pending Projects</Styled.h2>
        <Box mt={2}></Box>
        <Flex sx={{ alignItems: "center", mb: 2 }}>
          <Box>
            <Styled.h5>Project Name -</Styled.h5>
          </Box>
          <Box ml={3}>
            <Text color="primary"> Data</Text>
          </Box>
        </Flex>
      </Box>
    </PanelLayout>
  );
};

export default PendingProjects;
