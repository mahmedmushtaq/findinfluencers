import {
  Grid,
  Box,
  Styled,
  Link as LinkStyle,
  Input,
  Button,
  Text,
  Checkbox,
  Flex,
} from "theme-ui";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../common/styles/commonStyle";
import Link from "next/link";
import { FrontLayout } from "../common/layouts";
import Head from "next/head";

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

const Join = (props: any) => {
  return (
    <FrontLayout>
      <Box
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
          margin: "auto",
        }}
      >
        <Head>
          <title>Influencers | Join Influencers Market</title>
        </Head>
        <Link href="/">
          <LinkStyle>
            <Styled.h4 style={{ marginTop: 50, cursor: "pointer" }}>
              &#x2190; &nbsp; &nbsp;&nbsp;Back
            </Styled.h4>
          </LinkStyle>
        </Link>
        <Grid columns={[1, 2]} sx={{ mt: 5 }}>
          <Box>
            <Styled.h3>Sign In</Styled.h3>
            <Input
              mt={4}
              sx={{ ...InputStyle }}
              placeholder="Email"
              type="email"
            />
            <Input
              mt={4}
              sx={{ ...InputStyle }}
              placeholder="Password"
              type="password"
            />
            <Text mt={3} sx={{ cursor: "pointer" }}>
              Forgot Password?
            </Text>
            <Button mt={4}>
              <Link href="/panel/influencer">
                <a>Sign In</a>
              </Link>
            </Button>
          </Box>
          <Box>
            <Styled.h3>Sign Up</Styled.h3>
            <Input
              mt={4}
              sx={{ ...InputStyle }}
              placeholder="Name"
              type="text"
            />

            <Input
              mt={4}
              sx={{ ...InputStyle }}
              placeholder="Email"
              type="email"
            />
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

            <Button mt={4}>Sign up</Button>
          </Box>
        </Grid>
      </Box>
    </FrontLayout>
  );
};
export default Join;
