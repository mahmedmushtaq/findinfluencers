import { Image, Paperclip, DollarSign } from "react-feather";
import { Box, Text, Flex, Button, Input } from "theme-ui";
import {
  borderBottomLeftRadiusMobile,
  scrollBarStyle,
} from "../../../../../../styles/commonStyle";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { usePanelMessageConversation } from "../../../../hooks";
import MessageHeader from "./MessageHeader";
import MyMessageText from "./MyMessageText";
import UserMessageText from "./UserMessageText";

const conversationStyle: any = {
  flexDirection: "column",
  padding: "3px 3px 35px 3px ",
  height: "100%",
  overflowY: "auto",
  ...scrollBarStyle,
};

const PanelMessageConversation = (props: { isBusinessPanel?: boolean }) => {
  const router = useRouter();
  const user = router.query.user;
  const ref = useRef();
  const { state } = usePanelMessageConversation({
    username: user ? user.toString() : "",
  });
  const {
    sendMessage,
    status,
    writeMessage,
    onChange,
    currentMessages,
    userId,
    isSending,
  } = state;

  useEffect(() => {
    if (!ref || !currentMessages.length) return;

    if (ref && ref.current) {
      //@ts-ignore
      //   ref.current.scrollIntoView();
    }
  }, [currentMessages]);

  // scrollIntoView({ behavior: 'smooth' })

  const TextComponent = (props) => {
    const { msg } = props;
    if (msg.fromId === userId) {
      // msg comes from other user
      return <UserMessageText msg={msg} />;
    }

    return <MyMessageText msg={msg} />;
  };

  return (
    <Box
      sx={{
        minHeight: 0,
        width: "100%",
        margin: "auto",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {!user ? (
        <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
          <Box>Select Conversation</Box>
        </Flex>
      ) : (
        <Box>
          <MessageHeader username={user.toString()} status={status} />

          {/* mid */}
          <Box
            style={{
              height: "60vh",
              width: "95%",
              margin: "auto",
            }}
            // ref={ref}
          >
            <Box style={{ marginTop: 80 }}></Box>

            <Flex sx={conversationStyle}>
              {currentMessages.map((msg, index) => (
                <TextComponent
                  key={msg.id}
                  msg={msg}
                  // ref={index === currentMessages.length - 1 ? ref : undefined}
                />
              ))}
              <div ref={ref} style={{ height: 1 }} />
            </Flex>
          </Box>
          <Flex
            sx={{
              position: "fixed",
              bottom: 1,

              width: "100%",

              flexDirection: "column",
            }}
          >
            {isSending && <Text> Sending ..</Text>}
            <Flex
              sx={{
                width: "100%",
                backgroundColor: "#ecf0f1",
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
                value={writeMessage}
                onChange={onChange}
              />

              <Button sx={{ textAlign: "center" }} onClick={sendMessage}>
                <Text sx={{ fontSize: 17, fontFamily: "gilroyBold" }}>
                  Send
                </Text>
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default PanelMessageConversation;
