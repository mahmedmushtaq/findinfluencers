import { Grid, Box, Styled, Text, Flex } from "theme-ui";
import {
  ProtectedRouteHOC,
  InfluencerPanelStats,
} from "../../src/common/components";
 import { PanelLayout } from "../../src/common/layouts";


const InfluencerPanel = (props: any) => {
 
 
  console.log("props user is = ", props.user);
  return (
    <PanelLayout>
      <Box sx={{}}>
        <InfluencerPanelStats />
      </Box>
    </PanelLayout>
  );
};

export default ProtectedRouteHOC(InfluencerPanel);
