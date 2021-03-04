import { Box, Flex, Grid, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";

const Notification = (props: { isBusinessPanel?: boolean }) => {
  return (
    <PanelLayout businessPanel={props.isBusinessPanel} bodyTopMargin={40}>
      <Box
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
          margin: "auto",
        }}
      >
        <Grid mt={3}>
          <Styled.h5>Notifications</Styled.h5>
          <Flex mt={3} sx={{ alignItems: "center" }}>
            <Styled.h4>Notification Text</Styled.h4>
            <Text color="primary" ml={3}>
              Date
            </Text>
          </Flex>
        </Grid>
      </Box>
    </PanelLayout>
  );
};

export default Notification;
