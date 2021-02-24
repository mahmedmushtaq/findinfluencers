import {
  NavBar,
  HomeHeader,
  Footer,
  HomePlatform,
  HomeInfluencerFind,
  HomeJoinInfluencer,
} from "../common/components";
import { Box, Text, Flex } from "theme-ui";

const root = {
  width: ["85%", "95%", "85%"],
  margin: "auto",
};

const Index = (props: any) => {
  return (
    <Box style={{ backgroundColor: "white" }}>
    
      <HomeHeader />
      <Box sx={{ ...root }}>
        {/* <Box style={{ marginTop: 130 }}>
          <InfluencerGrid />
        </Box> */}
        {/* <br />
        <br />
        <Box mt={5}>
          <About />
        </Box> */}

        <br />
        <br />
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
      <Box mt={5}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Index;
