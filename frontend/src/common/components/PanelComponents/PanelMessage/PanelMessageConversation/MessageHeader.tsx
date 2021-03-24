import { Flex, Box, Button, Text } from "theme-ui";
const MessageHeader = (props: { username: string; status: string }) => {
  const { username, status } = props;
  return (
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
            {username}
          </Text>
          <Text style={{ fontSize: 9 }}>{status}</Text>
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
  );
};

export default MessageHeader;
