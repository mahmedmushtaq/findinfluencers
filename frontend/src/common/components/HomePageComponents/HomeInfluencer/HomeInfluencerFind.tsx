import Link from "next/link";
import { Box, Grid, Styled, Text, Button } from "theme-ui";
import {
  bgImageStyle,
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../../../../styles/commonStyle";
const HomeInfluencerFind = () => {
  return (
    <Grid columns={[1, 2]}>
      <Box>
        <Styled.h1>
          <Text sx={{ width: "90%" }} mb={4}>
            Finding Influencers Has Never Been Easier
          </Text>
        </Styled.h1>

        <Text sx={{ fontFamily: "gilroy", fontSize: 20 }}>
          &#10003; ·Search Different Platform and category Influencers
        </Text>
        <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
          &#10003; · Add Money In Escro
        </Text>
        <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
          &#10003; · 24/7 Customer Support
        </Text>
        <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
          &#10003; · Money Back Gurantee
        </Text>

        <Link href="/influencers/searchinfluencers">
          <Button
            mt={4}
            style={{
              cursor: "pointer",
              borderBottomLeftRadius: borderBottomLeftRadiusMobile + 10,
            }}
            sx={{
              ":focus": {
                outline: "none",
              },
            }}
          >
            <Styled.h4>
              <a>Search Influencers</a>
            </Styled.h4>
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: ["none", "block"],
          width: "40vw",
          height: 500,
          borderBottomLeftRadius: [borderBottomLeftRadiusLaptop + 100],
          ...bgImageStyle,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1576827471288-0a8f6d6c937b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=345&q=80)",
        }}
      ></Box>
    </Grid>
  );
};

export default HomeInfluencerFind;
