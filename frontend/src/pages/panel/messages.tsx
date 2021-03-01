import { Box, Button, Flex, Grid, Input, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../common/layouts";
import {
  PanelMessageConversation,
  PanelMessageList,
} from "../../common/components";

const Messages = (props: { isBusinessPanel?: boolean }) => {
  const { isBusinessPanel } = props;
  return (
    <PanelLayout
      bodyTopMargin={0}
      businessPanel={isBusinessPanel}
      fullWidth
      layoutFullHeight
    >
      <div style={{}}>
        <Flex
          sx={{
            flexDirection: "column",
            width: "100%",
            "::-webkit-scrollbar": {
              width: "6px !important",
              height: "6px !important",
            },
          }}
        >
          <Grid columns={[1, ".7fr 2fr"]} gap={0} style={{}}>
            <Box>
              <PanelMessageList />
            </Box>
            <Box sx={{ display: ["none", "block"] }}>
              <PanelMessageConversation isBusinessPanel={isBusinessPanel} />
            </Box>
          </Grid>
        </Flex>
      </div>
    </PanelLayout>
  );
};

export default Messages;
