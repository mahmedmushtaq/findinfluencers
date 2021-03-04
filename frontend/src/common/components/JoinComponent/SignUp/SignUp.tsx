import { Box, Button, Checkbox, Flex, Input, Styled, Text } from "theme-ui";
import Link from "next/link";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../../../styles/commonStyle";

const InputStyle = {
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  width: [
    standardShortWidthMobile,
    standardShortWidthMobile,
    standardShortWidthLaptop,
  ],
  ":focus": {
    outline: "none",
  },
};

const SignUp = () => {
  return (
    <Box>
      <Styled.h3>Sign Up</Styled.h3>
      <Input mt={4} sx={{ ...InputStyle }} placeholder="Name" type="text" />

      <Input mt={4} sx={{ ...InputStyle }} placeholder="Email" type="email" />
      <Input
        mt={4}
        sx={{ ...InputStyle }}
        placeholder="Password"
        type="password"
      />

      <Flex mt={3}>
        <Checkbox />
        <Text> Join as a Influencer</Text>
      </Flex>

      <Flex mt={3}>
        <Checkbox />
        <Text> Join as a Business Owner</Text>
      </Flex>

      <Button mt={4}>
        <Link href="/panel/business">
          <a>Sign Up</a>
        </Link>
      </Button>
    </Box>
  );
};

export default SignUp;
