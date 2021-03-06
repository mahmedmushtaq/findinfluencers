import { Box, Button, Grid, Input, Styled } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import {
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";
import { useRouter } from "next/router";

const Settings = (props: { isBusinessPanel?: boolean }) => {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/auth/logout");

    router.push("/");
  };
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
            sx={{
              borderBottomLeftRadius: borderBottomLeftRadiusMobile,
              ":focus": {
                outline: "none",
              },
            }}
          >
            <Styled.h5>Update</Styled.h5>
          </Button>

          <Button
            mt={3}
            ml={3}
            sx={{
              borderBottomLeftRadius: borderBottomLeftRadiusMobile,
              bg: "secondary",
              cursor: "pointer",
              ":focus": {
                outline: "none",
              },
            }}
            onClick={logout}
          >
            <Styled.h5>logout</Styled.h5>
          </Button>
        </Box>
      </Grid>
    </PanelLayout>
  );
};
export default Settings;
