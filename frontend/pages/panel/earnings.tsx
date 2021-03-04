import { useState } from "react";
import { Box, Grid, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import {
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../styles/commonStyle";

const boxStyle: any = {
  boxShadow: "0 0 1px 1px rgba(0,0,0,.4)",
  textAlign: "center",
  padding: 20,
  cursor: "pointer",
  borderBottomLeftRadius: [
    borderBottomLeftRadiusMobile,
    borderBottomLeftRadiusLaptop,
  ],
};

const Earnings = () => {
  return (
    <PanelLayout>
      <Box sx={{}}>
        <Grid columns={[2, 3]}>
          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Escrow</Styled.h4>
            <Text> 23$</Text>
          </Box>
          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Balance</Styled.h4>
            <Text>42$</Text>
          </Box>

          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Withdraw</Styled.h4>
            <Text>12$</Text>
          </Box>
        </Grid>
      </Box>
    </PanelLayout>
  );
};

export default Earnings;
