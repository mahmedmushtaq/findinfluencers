import { Grid, Box, Flex, Styled, Text, Button } from "theme-ui";
import MobileNavBar from "./MobileNavBar";
import NavBarData from "./NavBarData";
import Link from "next/link";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";

const mobileContainerSXStyle = {
  display: ["flex", "none"],
  justifyContent: "flex-end",
  alignItems: "center",
};

const NavBar = () => {
  return (
    <Grid
      columns={2}
      color="background"
      sx={{
        width: [
          standardShortWidthMobile,
          standardShortWidthMobile,
          standardShortWidthLaptop,
        ],
        justifyItems: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Box>
        <Styled.h1>
          <Text>Influencers</Text>
        </Styled.h1>
      </Box>

      <Box>
        <Button>
          <Styled.h4>
            <Text sx={{ padding: "0 20px", cursor: "pointer" }}>Join</Text>
          </Styled.h4>
        </Button>
      </Box>
    </Grid>
  );
};

export default NavBar;
