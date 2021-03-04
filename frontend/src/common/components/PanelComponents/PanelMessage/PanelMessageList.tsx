import { Box, Flex, Grid, Text, Styled } from "theme-ui";
import { scrollBarStyle } from "../../../../../styles/commonStyle";

const ConversationListStyle: any = {
  height: "100vh",
  overflow: "scroll",
  flexDirection: "column",
  alignItems: "flex-start",
  ...scrollBarStyle,
};

const PanelMessageList = () => {
  return (
    <Box>
      <Flex sx={{ ...ConversationListStyle }}>
        <Box sx={{ width: "95%", margin: "10px auto" }}>
          {/* <Styled.h4>
                  <Text sx={{ textAlign: "center" }} mt={4}>
                    Messenger
                  </Text>
                </Styled.h4>
                <CustomDivider
                  direction="horizontal"
                  width="100%"
                  bg="#ecf0f1"
                /> */}

          <Flex
            mt={3}
            sx={{
              alignItems: "center",
            }}
          >
            <img
              width={55}
              height={55}
              style={{ borderRadius: 50 }}
              src="/images/profile.png"
              alt=""
            />
            <Text ml={3}>
              <Styled.h5>Client Name</Styled.h5>
              <Text sx={{ fontSize: 11 }}>Online</Text>
            </Text>
            <Text sx={{ fontSize: 11 }} color="primary" ml="auto">
              Date
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default PanelMessageList;
