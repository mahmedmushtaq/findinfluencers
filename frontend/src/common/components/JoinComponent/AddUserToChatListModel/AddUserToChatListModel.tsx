import { Box, Button, Text, Flex } from "theme-ui";
import chatService from "../../../../modules/messages/services/chatService";
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../../../lib/graphql";
import { useRouter } from "next/router";
import useApi from "../../../../modules/messages/services/useApi";

const AddUserToChatListModel = ({ login, ignore }) => {
  const router = useRouter();
  const { data, error } = useQuery(SEARCH_USER, {
    variables: { input: { username: router.query.slug } },
    errorPolicy: "all",
  });

  const { createChat } = useApi();

  const addUser = async () => {
    if (!data) return;

    try {
      await chatService.createChat(data.searchUser.id);
      login();
    } catch (err) {
      console.log("addUser Error is = ", err);
    }
  };

  return (
    <Box>
      <Text sx={{ fontSize: 16, fontFamily: "gilroyBold", fontWeight: 700 }}>
        Do You Want To Start Conversation With This User
      </Text>
      <Flex
        mt={2}
        sx={{
          flexDirection: "column",
          margin: "auto",
        }}
      >
        <Button variant="contained" mt={2} mb={2} onClick={addUser}>
          Add User To My Contact
        </Button>
        <Button variant="contained" mt={3} onClick={ignore}>
          Ignore It
        </Button>
      </Flex>
    </Box>
  );
};

export default AddUserToChatListModel;
