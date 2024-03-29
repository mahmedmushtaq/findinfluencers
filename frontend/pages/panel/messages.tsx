import { Box, Button, Flex, Grid, Input, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { Chat } from "../../src/modules/messages/components";

const Messages = (props: { isBusinessPanel?: boolean }) => {
  const { isBusinessPanel } = props;
  const router = useRouter();

  return (
    <PanelLayout fullWidth bodyTopMargin={0} businessPanel={isBusinessPanel}>
      <Box style={{ position: "relative", height: "100vh" }}>
        <Chat />
      </Box>
      {/* <div style={{}}>
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
      </div> */}
    </PanelLayout>
  );
};

export default Messages;
