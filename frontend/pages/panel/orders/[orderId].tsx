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
import { useMutation, useQuery } from "@apollo/client";
import { ORDER_INFORMATION } from "../../../src/lib/graphql";
import { useEffect, useState } from "react";
import timeAgo from "../../../src/lib/timeAgo";
import { useRouter } from "next/router";
import { RootStateOrAny, useSelector } from "react-redux";

interface OrderType {
  id: string;
  createdAt: string;
  description: string;
  name: string;
  amount: string;
  status: string;
  owner: {
    full_name: string;
    id: string;
  };
  workingUser: {
    full_name: string;
    id: string;
  };
  platformProfile: {
    profileName: string;
    profileUrl: string;
    profileFollowers: string;
  };
}

const borderRight: any = {
  borderRight: "1px solid black",
  padding: 10,
};

const OrderInformation = () => {
  const router = useRouter();
  const user = useSelector((store: RootStateOrAny) => store.user);
  const [showAcceptOrRejectBtn, setShowAcceptOrRejectBtn] = useState(false);
  const { data, error, loading } = useQuery(ORDER_INFORMATION, {
    variables: {
      input: {
        orderId: router.query.orderId,
      },
    },
    errorPolicy: "all",
  });

  const [ordersData, setOrdersData] = useState<OrderType>();

  useEffect(() => {
    if (!data) return;

    setOrdersData(data.orderInformation);
    console.log("order Data is = ", data);
  }, [data]);

  return (
    <PanelLayout bodyTopMargin={40}>
      {ordersData && (
        <Box
          sx={{
            width: [
              standardShortWidthMobile,
              standardShortWidthMobile,
              standardShortWidthLaptop,
            ],
            margin: "auto",
            textAlign: "center",
          }}
        >
          <Styled.h4>Order Information</Styled.h4>
          <hr />
          <Box mt={3} />
          <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ ...borderRight }}>
              <Styled.h5>Order Name</Styled.h5>
              <Styled.h5>{ordersData.name}</Styled.h5>
            </Box>
            <Box sx={{ ...borderRight }}>
              <Styled.h5>When Order Is Placed</Styled.h5>
              <Text ml={3}> {timeAgo.ago(+ordersData.createdAt)} </Text>
            </Box>
            <Box sx={{ ...borderRight }}>
              <Styled.h5>Price</Styled.h5>
              <Text ml={3}> ${ordersData.amount} </Text>
            </Box>
            {user.role === "influencer" && (
              <Box>
                <Styled.h5>Order By</Styled.h5>
                <Text ml={3}> {ordersData.owner.full_name} </Text>
              </Box>
            )}
            {user.role === "buyer" && (
              <Box>
                <Styled.h5>Order To</Styled.h5>
                <Text ml={3}> {ordersData.workingUser.full_name} </Text>
              </Box>
            )}
          </Flex>
          <Text mt={2}>{ordersData.description}</Text>

          {ordersData.status === "needs_approval" &&
            user.role === "influencer" && (
              <Box mt={4}>
                <AcceptOrRejectOffer ordersData={ordersData} />
              </Box>
            )}
        </Box>
      )}
    </PanelLayout>
  );
};

export default OrderInformation;
