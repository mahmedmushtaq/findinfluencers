import { useEffect, useRef, useState } from "react";
import { Grid, Box, Styled, Flex, Text, Spinner } from "theme-ui";
import { PanelLayout } from "../../../src/common/layouts";
import {
  borderBottomLeftRadiusLaptop,
  borderBottomLeftRadiusMobile,
} from "../../../styles/commonStyle";

import {
  LOAD_ORDER_BY_STATUS,
  SET_OFFER_STATUS,
} from "../../../src/lib/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import timeAgo from "../../../src/lib/timeAgo";
import Order from "../orders";

import dynamic from "next/dynamic";
import {
  CustomButton,
  ProtectedRouteHOC,
} from "../../../src/common/components";

interface type {
  id: string;
  name: string;
  date: string;
  status: string;
  amount: string;
  owner: {
    full_name: string;
  };
}

const statusList = [
  { text: "Working", key: "working" },
  { text: "Needs Approval", key: "submit_for_payment" },
  { text: "Completed", key: "completed" },
];

const BusinessOrders = (props: { isBusinessPanel?: boolean }) => {
  // const [orderStatus, setOrderStatus] = useState("working");
  // const modalRef = useRef();
  // const [
  //   setOfferStatus,
  //   {
  //     data: submitForPaymentData,
  //     error: submitForPaymentError,
  //     loading: submitForPaymentLoading,
  //   },
  // ] = useMutation(SET_OFFER_STATUS, {
  //   errorPolicy: "all",
  // });

  // const [loadOfferByStatus, { called, loading, data }] = useLazyQuery(
  //   LOAD_ORDER_BY_STATUS,
  //   {
  //     variables: { status: orderStatus },
  //     errorPolicy: "all",
  //     fetchPolicy: "network-only",
  //   }
  // );

  // const [orderList, setOrderList] = useState<type[]>([]);
  // const [selectedOrder, setSelectedOrder] = useState<type>();

  // const setOrderStatusBtn = (status) => {
  //   setOrderList([]);
  //   setOrderStatus(status);
  // };

  // const onOrderSelection = (order) => {
  //   setSelectedOrder(order);
  //   //@ts-ignore
  //   modalRef.current.open();
  // };

  // const setSubmitForPaymentBtn = (order) => {
  //   setOfferStatus({
  //     variables: { input: { orderId: order.id, status: "submit_for_payment" } },
  //   });
  // };

  // useEffect(() => {
  //   loadOfferByStatus();
  // }, [orderStatus]);

  // useEffect(() => {
  //   if (!data) return;
  //   console.log("loaded data is = ", data.orderByStatus);
  //   setOrderList(data.orderByStatus);
  // }, [data]);

  // useEffect(() => {
  //   if (!submitForPaymentData) return;
  //   const orderId = submitForPaymentData.setOfferStatus.id;
  //   const filterOrderList = orderList.filter((order) => order.id !== orderId);
  //   setOrderList(filterOrderList);
  // }, [submitForPaymentData]);

  return (
    <Order isBusinessPanel statusList={statusList} />

    // <PanelLayout businessPanel={props.isBusinessPanel}>
    //   <Box sx={{}}>
    //     <Grid columns={"1fr 1fr 1fr"}>
    //       <Box
    //         sx={{ ...boxStyle }}
    //         onClick={() => setOrderStatusBtn("working")}
    //       >
    //         <Styled.h4>Current Orders</Styled.h4>
    //       </Box>
    //       <Flex style={{ width: "100%" }}>
    //         <Box
    //           sx={{ ...boxStyle }}
    //           onClick={() => setOrderStatusBtn("submit_for_payment")}
    //         >
    //           <Styled.h4>Submit For Payment</Styled.h4>
    //         </Box>
    //         {submitForPaymentLoading && <Spinner />}
    //       </Flex>

    //       <Box
    //         sx={{ ...boxStyle }}
    //         onClick={() => setOrderStatusBtn("completed")}
    //       >
    //         <Styled.h4>Completed</Styled.h4>
    //       </Box>
    //     </Grid>
    //     <Box mt={4}>
    //       <Styled.h5>
    //         {orderStatus === "working"
    //           ? "On Working Orders"
    //           : orderStatus.replaceAll("_", " ") + " orders"}
    //       </Styled.h5>
    //       <hr />
    //       {loading && <Spinner />}
    //       {orderList &&
    //         orderList.map((order) => (
    //           <Flex key={order.id} sx={{ alignItems: "center" }}>
    //             <Box>
    //               <Flex onClick={() => onOrderSelection(order)}>
    //                 <Text style={{ fontWeight: 700 }}>Order Name</Text>
    //                 <Text>- {order.name}</Text>
    //               </Flex>
    //               <Flex>
    //                 <Text>Price </Text>
    //                 <Text color="primary" ml={2}>
    //                   ${order.amount}
    //                 </Text>
    //               </Flex>
    //               {status === "working" && (
    //                 <CustomButton
    //                   mt={2}
    //                   onClick={() => {
    //                     setSubmitForPaymentBtn(order);
    //                   }}
    //                 >
    //                   Submit Work For Payment
    //                 </CustomButton>
    //               )}
    //             </Box>
    //             <Text color="primary" ml={2} sx={{ fontSize: 11, ml: "auto" }}>
    //               {timeAgo.ago(+order.date)}
    //             </Text>
    //           </Flex>
    //         ))}
    //     </Box>

    //     <OrderInformationModal modelRef={modalRef} orderData={selectedOrder} />
    //   </Box>
    // </PanelLayout>
  );
};
export default ProtectedRouteHOC(BusinessOrders, "buyer");
