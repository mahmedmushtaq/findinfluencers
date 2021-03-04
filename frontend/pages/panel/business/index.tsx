import { Box, Grid } from "theme-ui";
import { BusinessPanelDashboard } from "../../../src/common/components";
import { PanelLayout } from "../../../src/common/layouts";

const BusinessHomePage = () => {
  return (
    <PanelLayout businessPanel={true}>
      <Box>
        <BusinessPanelDashboard />
      </Box>
    </PanelLayout>
  );
};

export default BusinessHomePage;
