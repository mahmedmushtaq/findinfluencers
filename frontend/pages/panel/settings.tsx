import { Box, Button, Grid, Input, Styled } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import {
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";

const Settings = (props: { isBusinessPanel?: boolean }) => {
  return (
    <PanelLayout bodyTopMargin={40} businessPanel={props.isBusinessPanel}>
      <Grid
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
          margin: "auto",
        }}
      >
        <Styled.h4>Settings</Styled.h4>
        <Box mt={3}>
          <Input type="text" placeholder="Change Name" />
          <Input mt={4} type="email" placeholder="Change Email Address" />
          <Input mt={4} type="password" placeholder="Change Password" />
          <Button
            mt={3}
            sx={{ borderBottomLeftRadius: borderBottomLeftRadiusMobile }}
          >
            <Styled.h5>Update</Styled.h5>
          </Button>
        </Box>
      </Grid>
    </PanelLayout>
  );
};
export default Settings;
