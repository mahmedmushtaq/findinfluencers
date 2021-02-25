import { Grid, Box, Flex, Styled, Text, Button } from "theme-ui";
import Link from "next/link";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
  borderBottomLeftRadiusMobile,
} from "../../../styles/commonStyle";

const NavBar = () => {
  return (
    <Grid
      columns={2}
      color="background"
      sx={{
        width: [
          standardShortWidthMobile,
          standardShortWidthMobile,
          standardShortWidthLaptop,
        ],
        justifyItems: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Box>
        <Styled.h1>
          <Text>
            <Link href="/">
              <a>Influencers</a>
            </Link>
          </Text>
        </Styled.h1>
      </Box>

      <Flex sx={{ alignItems: "center" }}>
        {/* <Styled.h4>
          <Text mr={4}>
            <Link href="/whyus">
              <a>Why Us</a>
            </Link>
          </Text>
        </Styled.h4> */}
        <Button sx={{ borderBottomLeftRadius: borderBottomLeftRadiusMobile }}>
          <Styled.h4>
            <Text
              sx={{
                padding: "0 20px",
              }}
            >
              <Link href="/join">
                <a> Join</a>
              </Link>
            </Text>
          </Styled.h4>
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavBar;
