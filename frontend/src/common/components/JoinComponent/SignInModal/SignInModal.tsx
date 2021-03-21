import { Box, Text } from "theme-ui";
import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import router from "next/router";
import { useRouter } from "next/router";

const SignInModal = (props) => {
  const { modalRef } = props;
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const router = useRouter();
  const afterLoginUserRedirectTo = "/panel/business/messages";

  const onSuccessful = (data) => {
    router.push(`${afterLoginUserRedirectTo}?user=${router.query.slug}`);
  };

  return (
    <Box>
      <Modal ref={modalRef} height={showSignUpModal ? 450 : 350}>
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
      </Modal>
    </Box>
  );
};

export default SignInModal;
