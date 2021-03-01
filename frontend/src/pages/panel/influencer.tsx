import { Grid, Box, Styled, Text, Flex } from "theme-ui";
import { PanelNavBar, InfluencerPanelStats } from "../../common/components";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../common/styles/commonStyle";
import { PanelLayout } from "../../common/layouts";

const InfluencerPanel = () => {
  return (
    <PanelLayout>
      <Box sx={{}}>
        <InfluencerPanelStats />
      </Box>
    </PanelLayout>
  );
};

export default InfluencerPanel;
