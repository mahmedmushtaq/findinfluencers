import { Grid, Box, Styled, Text, Flex } from "theme-ui";
import { PanelNavBar, InfluencerPanelStats } from "../../src/common/components";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";
import { PanelLayout } from "../../src/common/layouts";
import { withIronSession } from "next-iron-session";

const InfluencerPanel = (props: any) => {
  if (!props.user.isLoggedIn) return <div>Required Auth</div>;

  return (
    <PanelLayout>
      <Box sx={{}}>
        <InfluencerPanelStats />
      </Box>
    </PanelLayout>
  );
};

// export const getServerSideProps = withIronSession()

export default InfluencerPanel;
