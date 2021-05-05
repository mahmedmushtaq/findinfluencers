import {
  HomePlatform,
  HomeInfluencerFind,
  HomeJoinInfluencer,
} from "../src/common/components";
import { Box, Text, Flex } from "theme-ui";
import { FrontLayout } from "../src/common/layouts";
import Head from "next/head";
import tawkTo from "tawkto-react";
import { useEffect } from "react";

const Index = (props: any) => {
  const tawkToPropertyId = "6092f6c1185beb22b30a6ff3";

  // Direct Chat Link
  // https://tawk.to/chat/tawkToPropertyId/tawkToKey

  const tawkToKey = "1f4v17pjs";
  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey);
  }, []);

  return (
    <FrontLayout>
      <Box>
        <Head>
          <title>
            HireInfluencerss | Find Influencers And Build Your Brand{" "}
          </title>
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
