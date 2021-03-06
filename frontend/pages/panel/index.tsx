import { Grid, Box, Styled, Text, Flex } from "theme-ui";
import {
  ProtectedRouteHOC,
  InfluencerPanelStats,
} from "../../src/common/components";

import { PanelLayout } from "../../src/common/layouts";

const InfluencerPanel = (props: any) => {
  return (
    <PanelLayout>
      <Box sx={{}}>
        <InfluencerPanelStats />
      </Box>
    </PanelLayout>
  );
};

export default ProtectedRouteHOC(InfluencerPanel);
