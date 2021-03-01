import { Box, Grid } from "theme-ui";
import { BusinessPanelDashboard } from "../../../common/components";
import { PanelLayout } from "../../../common/layouts";

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
