import { Box, Grid, Flex, Text, Styled } from "theme-ui";
import Link from "next/link";
import { Certificate } from "crypto";

const cursorStyle = { cursor: "pointer" };

const Footer = (props: any) => {
  return (
    <Grid
      columns={1}
      bg={"#32353b"}
      color={"white"}
      sx={{ height: ["100%", "40vh"] }}
    >
      <Box style={{}} sx={{ width: ["80vw"], margin: "auto" }}>
        <Grid
          columns={[1, 3]}
          sx={{
            justifyItems: ["center", "start"],
          }}
        >
          <Flex sx={{}}>
            <Styled.h2>
              <Text sx={{ color: "white" }}>influencer</Text>
            </Styled.h2>
          </Flex>

          <Box mb={4}>
            <Styled.h3>
              <Text sx={{ fontFamily: "gilroy" }}>Product</Text>
            </Styled.h3>
            <Text mt={2} style={cursorStyle}>
              <Link href="/whyus">
                <a>Why Us</a>
              </Link>
            </Text>
            <Text mt={2} style={cursorStyle}>
              <Link href="/influencers/searchinfluencers">
                <a>Influencers</a>
              </Link>
            </Text>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Styled.h3>
              <Text sx={{ fontFamily: "gilroy" }}>Support</Text>
            </Styled.h3>
            {/* <Text mt={2} style={cursorStyle}>
              <Link href="/">
                <a>How It works</a>
              </Link>
            </Text> */}
            <Text mt={2} style={cursorStyle}>
              <Link href="/">
                <a>Contact: influencers@gmail.com</a>
              </Link>
              <Flex
                sx={{
                  justifyContent: "center",
                  marginTop: [30, 50],
                  marginBottom: [30, 0],
                }}
              >
                <img
                  width={50}
                  src="https://www.flaticon.com/svg/vstatic/svg/733/733547.svg?token=exp=1614142557~hmac=121c9463de68c759815783c083c96b1b"
                  alt=""
                />
                <img
                  width={50}
                  src="https://www.flaticon.com/svg/vstatic/svg/2111/2111463.svg?token=exp=1614142719~hmac=83d5dd263d516c6566df6969078cdda0"
                  alt=""
                  style={{ marginLeft: 30 }}
                />

                <img
                  width={50}
                  src="https://www.flaticon.com/svg/vstatic/svg/733/733579.svg?token=exp=1614142802~hmac=741750b11e94778feaaee45fa39a4c5b"
                  alt=""
                  style={{ marginLeft: 30 }}
                />
              </Flex>
            </Text>
          </Box>
        </Grid>
        <Box>{/* contact */}</Box>
      </Box>
    </Grid>
  );
};

export default Footer;
