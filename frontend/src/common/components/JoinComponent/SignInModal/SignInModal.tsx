import { Box, Text } from "theme-ui";
import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import router from "next/router";
import { useRouter } from "next/router";
import { login } from "../../../../modules/messages/store/actions/auth";
import AddUserToChatListModel from "../AddUserToChatListModel/AddUserToChatListModel";

const SignInModal = (props: { modalRef; addUserToChatList }) => {
  const { modalRef, addUserToChatList } = props;
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showAddUserToChatList, setShowAddUserToChatList] = useState(false);

  const afterLoginUserRedirectTo = "/panel/business/messages";

  const onSuccessful = (data) => {
    setShowAddUserToChatList(true);
  };

  const login = () => {
    router.push(`${afterLoginUserRedirectTo}`);
  };

  const ignore = () => {
    modalRef.current.close();
  };

  useEffect(() => {
    setShowAddUserToChatList(addUserToChatList);
  }, [addUserToChatList]);

  return (
    <Box>
      <Modal
        ref={modalRef}
        height={!showAddUserToChatList ? (showSignUpModal ? 450 : 350) : 200}
      >
        {!showAddUserToChatList ? (
          <Box>
            {showSignUpModal ? (
              <SignUp onSuccessful={onSuccessful} />
            ) : (
              <SignIn onSuccessful={onSuccessful} />
            )}
            <Text
              mt={1}
              sx={{ fontFamily: "gilroy", fontSize: 2, cursor: "pointer" }}
              onClick={() => setShowSignUpModal(!showSignUpModal)}
            >
              {showSignUpModal
                ? "Already have an account"
                : " Require An Account?"}
            </Text>
          </Box>
        ) : (
          <AddUserToChatListModel login={login} ignore={ignore} />
        )}
      </Modal>
    </Box>
  );
};

export default SignInModal;
