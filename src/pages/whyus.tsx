import { Box, Text, Styled } from "theme-ui";
import { Header } from "../common/components";
import { FrontLayout } from "../common/layouts";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../common/styles/commonStyle";
import Head from "next/head";

const WhyUs = () => {
  return (
    <FrontLayout>
      <Box sx={{}}>
        <Head>
          <title>Influencers | Why You Choose Us</title>
        </Head>
        <Box sx={{ width: ["95%", "80%", "70%"], margin: "auto" }}>
          <Styled.h2>
            <Text sx={{ textAlign: "center" }}>
              Why You Choose Influencers?
            </Text>
          </Styled.h2>
          <Box>
            <Text>
              - <strong>According to Forbes</strong>, influencer marketing is
              growing faster than digital ads. It allows brands to locate and
              advertise directly to their target audience.
            </Text>
            <Text mt={3}>
              - <strong> Influencer</strong> marketing can greatly expand your
              reach and positioning online
            </Text>

            <Text mt={3}>
              - We Help you to find different platform and category influencers
              and we will also verify influencer followers so no one can cheat
              you, and you can easily build your brand recognization
            </Text>
          </Box>
        </Box>
      </Box>
    </FrontLayout>
  );
};

export default WhyUs;
