import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Box, Grid, Styled, Text } from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import { LOAD_ESCROW_AMOUNT } from "../../src/lib/graphql";
import {
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../styles/commonStyle";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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

const PaymentWithdrawlPopup = dynamic(
  () =>
    import("../../src/common/components/PanelComponents/PaymentWithDrawlPoup")
);

const Earnings = () => {
  const { data, error, loading } = useQuery(LOAD_ESCROW_AMOUNT);
  const [showPaymentWithdrawlPopup, setShowPaymentWithdrawlPopup] =
    useState(false);
  const [pending, setPending] = useState(0);
  const [holding, setHolding] = useState(0);
  const [account, setAccount] = useState(0);
  const user = useSelector((store: RootStateOrAny) => store.user);
  useEffect(() => {
    if (!data) return;
    let pendingAmount = 0;
    let holdAmount = 0;
    const res = data.myEscrow;
    res.escrows.map((escrow) => {
      if (escrow.status === "company_holds") {
        pendingAmount += +escrow.order.amount;
      } else if (escrow.status === "company_holds_for_five_days") {
        holdAmount += +escrow.order.amount;
      }
    });
    setPending(pendingAmount);
    setHolding(holdAmount);
    setAccount(res.amount);
  }, [data]);

  const onClickAccount = () => {
    if (user.role !== "influencer" || account === 0) return;

    setShowPaymentWithdrawlPopup(true);
  };

  return (
    <PanelLayout>
      <Box sx={{}}>
        <Grid columns={[2, 3]}>
          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Pending</Styled.h4>
            <Text> ${pending}</Text>
          </Box>
          <Box sx={{ ...boxStyle }}>
            <Styled.h4>Hold</Styled.h4>
            <Text>${holding}</Text>
          </Box>

          <Box sx={{ ...boxStyle }} onClick={onClickAccount}>
            <Styled.h4>Account</Styled.h4>
            <Text>${account}</Text>
          </Box>
        </Grid>
        <Popup
          onClose={() => setShowPaymentWithdrawlPopup(false)}
          open={showPaymentWithdrawlPopup}
        >
          <PaymentWithdrawlPopup amount={account} />
        </Popup>
      </Box>
    </PanelLayout>
  );
};

export default Earnings;
