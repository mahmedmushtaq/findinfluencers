import { Image, Paperclip, DollarSign } from "react-feather";
import { Box, Text, Flex, Button, Input } from "theme-ui";
import {
  borderBottomLeftRadiusMobile,
  scrollBarStyle,
} from "../../../styles/commonStyle";

const PanelMessageConversation = (props: { isBusinessPanel?: boolean }) => {
  return (
    <Box
      sx={{
        minHeight: 0,
        height: "100%",
        width: "100%",
        margin: "auto",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ecf0f1",
          position: "absolute",
          width: "100%",
          padding: 20,
          top: 0,
        }}
      >
        <Flex sx={{ justifyContent: "space-between" }}>
          <Box>
            <Text sx={{ fontSize: 17, fontFamily: "gilroyBold" }}>
              Online Status
            </Text>
            <Text sx={{ fontSize: 11 }}>Online Status</Text>
          </Box>
          <Box>
            <Button>
              <Text sx={{ fontSize: 11, fontFamily: "gilroyBold" }}>
                Create An Order
              </Text>
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* mid */}
      <Box
        style={{
          height: "60vh",
          width: "95%",
          margin: "auto",
        }}
      >
        <Box style={{ marginTop: 80 }}></Box>
        <Flex
          sx={{
            flexDirection: "column",
            pt: 3,
            height: "100%",
            overflowY: "auto",
            ...scrollBarStyle,
          }}
        >
          <Text
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "#ecf0f1",
              padding: 10,
              borderBottomLeftRadius: borderBottomLeftRadiusMobile,
            }}
            mt={3}
          >
            My Text
          </Text>

          <Text
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "primary",
              color: "white",
              padding: 10,
              borderBottomLeftRadius: borderBottomLeftRadiusMobile,
            }}
            mt={3}
          >
            My Text
          </Text>
        </Flex>
      </Box>
      <Flex
        sx={{
          position: "fixed",
          bottom: 1,
          backgroundColor: "#ecf0f1",
          width: "100%",
          alignItems: "center",
          padding: "20px 10px",
        }}
      >
        <Image cursor="pointer" />
        <Box ml={2} mr={1}>
          <Paperclip cursor="pointer" />
        </Box>

        <Input
          sx={{
            width: "60%",
            backgroundColor: "white",
            ":focus": {
              outlineColor: "#7f8c8d",
            },
          }}
          placeholder="Enter Your Message"
          mr={3}
          ml={3}
        />

        <Button sx={{ textAlign: "center" }}>
          <Text sx={{ fontSize: 17, fontFamily: "gilroyBold" }}>Send</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default PanelMessageConversation;
