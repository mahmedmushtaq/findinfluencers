import { Text, Box, Flex } from "theme-ui";
import { borderBottomLeftRadiusMobile } from "../../../../../../styles/commonStyle";
import { MessageType } from "../../../../../socket/Messages/types";
// import timeAgo from "time-ago";

const MyMessageText = (props: { msg: MessageType }) => {
  // show this text on the left side
  const { msg } = props;
  return (
    <Flex sx={{ flexDirection: "column", justifyContent: "flex-end" }}>
      <Text
        sx={{
          alignSelf: "flex-end",
          backgroundColor: "#ecf0f1",
          padding: 10,
          borderBottomLeftRadius: borderBottomLeftRadiusMobile,
        }}
        mt={3}
      >
        {msg.body}
      </Text>
      <Text style={{ fontSize: 10, alignSelf: "flex-end" }}>
        {/* {timeAgo.ago(msg.date - 1000)} */}
      </Text>
    </Flex>
  );
};

export default MyMessageText;
