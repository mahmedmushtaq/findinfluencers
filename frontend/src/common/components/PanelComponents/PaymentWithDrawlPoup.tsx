import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Spinner, Styled, Text } from "theme-ui";
import { PAYMENT_WITHDRAWL } from "../../../lib/graphql";

const PaymentWithdrawlPopup = (props: { amount: number }) => {
  const { amount } = props;
  const [changeAmount, setChangeAmount] = useState<string | number>();
  const [paymentWithdrawl, { data, error, loading }] = useMutation(
    PAYMENT_WITHDRAWL,
    {
      errorPolicy: "all",
    }
  );
  console.log("change amount is = ", changeAmount);

  useEffect(() => {
    setChangeAmount(amount);
  }, [amount]);

  const paymentWithdrawlBtn = () => {
    // console.log("change Amount ", +changeAmount);
    paymentWithdrawl({ variables: { input: { amount: +changeAmount } } });
  };

  return (
    <Box>
      {data && (
        <Text color="primary">
          Our Support Team Memeber Will Contact You Soon
        </Text>
      )}
      {error && <Text color="primary">{error.message}</Text>}
      <Box>
        Enter amount which you want to withdrawl
        <Input
          type="number"
          max={amount}
          min={0}
          placeholder="Enter amount you want to withdrawl"
          value={changeAmount}
          onChange={(e) => setChangeAmount(e.target.value)}
        />
      </Box>
      <Flex mt={3}>
        <Button onClick={paymentWithdrawlBtn}>Send Request</Button>
        {loading && <Spinner />}
      </Flex>
    </Box>
  );
};

export default PaymentWithdrawlPopup;
