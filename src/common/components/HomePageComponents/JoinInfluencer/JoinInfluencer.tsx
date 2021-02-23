import { Grid, Box, Styled, Text, Button } from "theme-ui";
import {
  bgImageStyle,
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../commonStyle";

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
            backgroundImage:
              "url(https://images.unsplash.com/photo-1612816174108-9515a66a4582?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80)",
          }}
        ></Box>
        <Box>
          <Styled.h1>
            <Text sx={{ width: "90%" }} mb={4}>
              Engage And Earn Money From Your Audience
            </Text>
          </Styled.h1>

          <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
            &#10003; · Easily Setup Profile
          </Text>

          <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
            &#10003; · We are responsible to get your money from your client
          </Text>

          <Text mt={2} sx={{ fontFamily: "gilroy", fontSize: 20 }}>
            &#10003; · 24/7 Customer Support
          </Text>

          <Button
            mt={4}
            style={{
              cursor: "pointer",
              borderBottomLeftRadius: borderBottomLeftRadiusMobile + 10,
            }}
          >
            <Styled.h4>Start Earning</Styled.h4>
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default JoinInfluencer;
