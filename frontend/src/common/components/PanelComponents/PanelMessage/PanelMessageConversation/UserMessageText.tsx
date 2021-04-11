import { Text, Flex } from "theme-ui";
import { borderBottomLeftRadiusMobile } from "../../../../../../styles/commonStyle";
import { MessageType } from "../../../../../socket/Messages/types";
// import timeAgo from "time-ago";

const UserMessageText = (props: { msg: MessageType }) => {
  const { msg } = props;
  return (
    <Flex sx={{ flexDirection: "column", justifyContent: "flex-end" }}>
      <Text
        sx={{
          alignSelf: "flex-start",
          backgroundColor: "#ecf0f1",
          padding: 10,
          borderBottomLeftRadius: borderBottomLeftRadiusMobile,
          bg: "primary",
          color: "background",
        }}
        mt={3}
      >
        {msg.body}
      </Text>
      <Text style={{ fontSize: 10, alignSelf: "flex-start" }}>
        {/* {timeAgo.ago(msg.date)} */}
      </Text>
    </Flex>
  );
};

export default UserMessageText;
