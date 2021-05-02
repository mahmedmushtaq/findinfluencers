import { Grid, Box, Styled, Link as LinkStyle } from "theme-ui";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../styles/commonStyle";
import Link from "next/link";
import { FrontLayout } from "../src/common/layouts";
import Head from "next/head";
import { SignIn, SignUp } from "../src/common/components";
import { useQuery } from "@apollo/client";

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
          <title>HireInfluencerss | Join Influencers Market</title>
        </Head>
        <Link href="/">
          <LinkStyle>
            <Styled.h4 style={{ marginTop: 50, cursor: "pointer" }}>
              &#x2190; &nbsp; &nbsp;&nbsp;Back
            </Styled.h4>
          </LinkStyle>
        </Link>
        <Grid columns={[1, 2]} sx={{ mt: 5 }}>
          <SignIn />
          <SignUp />
        </Grid>
      </Box>
    </FrontLayout>
  );
};

// Join.getInitialProps = () => {
//   return { user: {} };
// };
export default Join;
