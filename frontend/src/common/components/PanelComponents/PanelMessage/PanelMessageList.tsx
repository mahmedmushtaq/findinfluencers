import { Box, Flex, Grid, Text, Styled } from "theme-ui";
import { scrollBarStyle } from "../../../../../styles/commonStyle";
import { usePanelMessageList } from "../../../hooks";
import router from "next/router";

const ConversationListStyle: any = {
  height: "100vh",
  overflow: "scroll",
  flexDirection: "column",
  alignItems: "flex-start",
  ...scrollBarStyle,
};

const PanelMessageList = () => {
  const { state } = usePanelMessageList();
  const { conversationsData, user } = state;

  const getUserFromConversation = (conversation) => {
    if (conversation.fromId.id === user.id) {
      return conversation.toId;
    } else {
      return conversation.fromId;
    }
  };

  const getClientName = (conversation) => {
    return getUserFromConversation(conversation).full_name;
  };

  const passUserToParam = (conversation) => {
    console.log(router, router.router.pathname, conversation);
    const username = getUserFromConversation(conversation).username;

    router.replace({ pathname: router.pathname, query: { user: username } });
  };

  return (
    <Box>
      <Flex sx={{ ...ConversationListStyle }}>
        <Box sx={{ width: "95%", margin: "10px auto" }}>
          {/* <Styled.h4>
            <Text sx={{ textAlign: "center" }} mt={4}>
              Messenger
            </Text>
          </Styled.h4>
          <CustomDivider direction="horizontal" width="100%" bg="#ecf0f1" /> */}

          {conversationsData &&
            conversationsData.map((conversation) => (
              <Flex
                mt={3}
                key={conversation.id}
                sx={{
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => passUserToParam(conversation)}
              >
                <img
                  width={55}
                  height={55}
                  style={{ borderRadius: 50 }}
                  src="/images/profile.png"
                  alt=""
                />
                <Text ml={3}>
                  <Styled.h5>{getClientName(conversation)}</Styled.h5>
                  {/* <Text sx={{ fontSize: 11 }}>Online</Text> */}
                </Text>
                {/* <Text sx={{ fontSize: 11 }} color="primary" ml="auto">
                Date
              </Text> */}
              </Flex>
            ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default PanelMessageList;
