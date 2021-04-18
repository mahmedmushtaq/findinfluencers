import { Box, Flex, Button, Styled, Text, Card, Grid, Spinner } from "theme-ui";
import {
  AcceptOrRejectOffer,
  CustomButton,
} from "../../../src/common/components";
import { PanelLayout } from "../../../src/common/layouts";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../styles/commonStyle";
import { useQuery } from "@apollo/client";
import { LOAD_MY_PENDING_ORDERS } from "../../../src/lib/graphql";
import { useEffect, useState } from "react";
import timeAgo from "../../../src/lib/timeAgo";
import { useRouter } from "next/router";

const NewOrder = () => {
  const { data, error, loading } = useQuery(LOAD_MY_PENDING_ORDERS, {
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  const [ordersData, setOrdersData] = useState<
    {
      id: string;
      name: string;
      amount: string;
      createdAt: string;
    }[]
  >([]);

  useEffect(() => {
    if (!data) return;
    setOrdersData(data.myPendingOrders);
  }, [data]);

  const exploreOrderInformation = (data) => {
    router.push(`/panel/orders/${data.id}`);
  };

  return (
    <PanelLayout bodyTopMargin={40}>
      <Box
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
          margin: "auto",
        }}
      >
        <Styled.h4>New Order Requests</Styled.h4>
        <hr />
        {loading && <Spinner />}

        <Grid mt={4} columns={3}>
          {ordersData &&
            ordersData.map((order) => (
              <Card key={order.id} style={{ width: 300, padding: 20 }}>
                <Flex sx={{ alignItems: "center" }}>
                  <Box>
                    <Styled.h6>{order.name}</Styled.h6>
                    <Styled.h4>Price ${order.amount}</Styled.h4>
                  </Box>
                  <Text color="primary" ml={"auto"}>
                    {timeAgo.ago(+order.createdAt)}
                  </Text>
                </Flex>
                <AcceptOrRejectOffer ordersData={order} />
                <Flex
                  mt={2}
                  sx={{ justifyContent: "center", cursor: "pointer" }}
                  onClick={() => exploreOrderInformation(order)}
                >
                  <Text color="primary">More Info</Text>
                </Flex>
              </Card>
            ))}
        </Grid>
      </Box>
    </PanelLayout>
  );
};

export default NewOrder;
