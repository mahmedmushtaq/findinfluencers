import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Box, Grid, Spinner, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../../src/common/layouts";
import { LOAD_ESCROW_AMOUNT } from "../../../src/lib/graphql";
import {
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../../styles/commonStyle";

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
  const { data, error, loading } = useQuery(LOAD_ESCROW_AMOUNT);
  const [pending, setPending] = useState(0);
  const [holding, setHolding] = useState(0);
  const [account, setAccount] = useState(0);
  useEffect(() => {
    if (!data) return;
    let pendingAmount = 0;
    const res = data.myEscrow;
    res.escrows.map((escrow) => {
      if (escrow.status === "company_holds") {
        pendingAmount += +escrow.order.amount;
      }
    });
    setPending(pendingAmount);
    setAccount(res.amount);
    console.log("data is = ", data);
  }, [data]);
  return (
    <PanelLayout>
      <Box sx={{}}>
        <Grid columns={[2]}>
          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Escrow</Styled.h4>
            <Text> ${pending}</Text>
          </Box>

          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Paid</Styled.h4>
            <Text>${account}</Text>
          </Box>
        </Grid>
        <Box mt={3}>{loading && <Spinner />}</Box>
      </Box>
    </PanelLayout>
  );
};

export default Earnings;
