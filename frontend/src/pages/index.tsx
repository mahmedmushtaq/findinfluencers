import {
  NavBar,
  Header,
  Footer,
  HomePlatform,
  HomeInfluencerFind,
  HomeJoinInfluencer,
} from "../common/components";
import { Box, Text, Flex } from "theme-ui";
import { FrontLayout } from "../common/layouts";
import Head from "next/head";

const Index = (props: any) => {
  return (
    <FrontLayout>
      <Box>
        <Head>
          <title>Influencers | Find Influencers And Build Your Brand </title>
        </Head>
        <Box mt={5}>
          <HomePlatform />
        </Box>
        <Box style={{ marginTop: 100 }}>
          <HomeInfluencerFind />
        </Box>

        <Box style={{ marginTop: 150 }}>
          <HomeJoinInfluencer />
        </Box>
      </Box>
    </FrontLayout>
  );
};

export default Index;
