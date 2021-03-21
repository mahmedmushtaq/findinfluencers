import { Grid, Box, Styled, Text, Button } from "theme-ui";
import {
  bgImageStyle,
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../../../../styles/commonStyle";
import Link from "next/link";

const JoinInfluencer = () => {
  return (
    <Box>
      <Grid columns={[1, 2]}>
        <Box
          sx={{
            width: "40vw",
            height: 500,
            borderBottomLeftRadius: borderBottomLeftRadiusLaptop + 100,
            display: ["none", "block"],
            ...bgImageStyle,
            backgroundPosition: "top top",
            backgroundImage:
              //"url(https://images.unsplash.com/photo-1612816174108-9515a66a4582?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80)",
              "url(https://images.unsplash.com/photo-1498484502070-2165cb42d504?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGFjdGl2aXR5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)",
          }}
        ></Box>
        <Box>
          <Styled.h1>
            <Text sx={{ width: "90%" }} mb={4}>
              Engage And Earn Money From Your Audience
            </Text>
          </Styled.h1>

          <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
            ✔️ · Easily Setup Profile
          </Text>

          <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
            ✔️ · We are responsible to get your money from your client
          </Text>

          <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
            ✔️ · 24/7 Customer Support
          </Text>
          <Link href="/join">
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
                <a>Start Earning</a>
              </Styled.h4>
            </Button>
          </Link>
        </Box>
      </Grid>
    </Box>
  );
};

export default JoinInfluencer;
