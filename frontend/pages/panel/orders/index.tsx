import { useEffect, useRef, useState } from "react";
import { Grid, Box, Styled, Flex, Text, Spinner } from "theme-ui";
import { PanelLayout } from "../../../src/common/layouts";

import timeAgo from "../../../src/lib/timeAgo";

import dynamic from "next/dynamic";
import { CustomButton, OrderHeader } from "../../../src/common/components";
import useOrder, { type } from "../../../src/common/hooks/panelHooks/useOrder";
import { RootStateOrAny, useSelector } from "react-redux";
// requires default import
const OrderInformationModal = dynamic(
  () =>
    import(
      "../../../src/common/components/PanelComponents/OrderInformationPopup/OrderInformationPop"
    )
);

const statusList = [
  { text: "Working", key: "working" },
  { text: "Submit For Payment", key: "submit_for_payment" },
  { text: "Completed", key: "completed" },
];

const Orders = (props: {
  isBusinessPanel?: boolean;
  statusList?: { text: string; key: string }[];
}) => {
  const [orderStatus, setOrderStatus] = useState({
    text: "Working",
    key: "working",
  });
  const modalRef = useRef();
  const [selectedOrder, setSelectedOrder] = useState<type>();
  const user = useSelector((store: RootStateOrAny) => store.user);
  const statusListRecord = props.statusList || statusList;

  const {
    orderList,
    setOrderList,
    setOfferStatusLoading,
    setOfferStatus,
    loading,
  } = useOrder({ orderStatus });

  const setOrderStatusBtn = (status) => {
    setOrderList([]);
    setOrderStatus(status);
  };

  const setSubmitForPaymentBtn = (order, status) => {
    setOfferStatus({
      variables: { input: { orderId: order.id, status } },
    });
  };

  const onOrderSelection = (order) => {
    console.log("order is ", order);
    setSelectedOrder(order);
    //@ts-ignore
    modalRef.current.open();
  };

  const isShowSubmitForBtn =
    orderStatus.key === "working" && user.role === "influencer";

  const approvedSubmitForPaymentOrderBtn =
    orderStatus.key === "submit_for_payment" && user.role === "buyer";

  return (
    <PanelLayout businessPanel={props.isBusinessPanel}>
      <Box sx={{}}>
        <OrderHeader
          statusLists={statusListRecord}
          setOrderStatus={setOrderStatusBtn}
        />
        {(setOfferStatusLoading || loading) && <Spinner />}

        <Box mt={4}>
          <Styled.h5>
            {orderStatus.text} Orders
            {/* {orderStatus.ke === "working"
              ? "On Working Orders"
              : orderStatus.replaceAll("_", " ") + " orders"} */}
          </Styled.h5>
          <hr />

          {orderList &&
            orderList.map((order: type) => (
              <Flex key={order.id} sx={{ alignItems: "center" }} mt={4} mb={2}>
                <Box>
                  <Flex
                    onClick={() => onOrderSelection(order)}
                    style={{ cursor: "pointer" }}
                  >
                    <Text style={{ fontWeight: 700 }}>Order Name</Text>
                    <Text>- {order.name}</Text>
                  </Flex>
                  <Flex>
                    <Text>Price </Text>
                    <Text color="primary" ml={2}>
                      ${order.amount}
                    </Text>
                  </Flex>
                  {isShowSubmitForBtn && (
                    <CustomButton
                      mt={2}
                      onClick={() => {
                        setSubmitForPaymentBtn(order, "submit_for_payment");
                      }}
                    >
                      Submit Work For Payment
                    </CustomButton>
                  )}
                  {approvedSubmitForPaymentOrderBtn && (
                    <CustomButton
                      mt={2}
                      onClick={() => {
                        setSubmitForPaymentBtn(order, "completed");
                      }}
                    >
                      Approved Payment
                    </CustomButton>
                  )}
                </Box>
                <Text color="primary" ml={2} sx={{ fontSize: 11, ml: "auto" }}>
                  {timeAgo.ago(+order.createdAt)}
                </Text>
              </Flex>
            ))}
        </Box>

        <OrderInformationModal modelRef={modalRef} orderData={selectedOrder} />
      </Box>
    </PanelLayout>
  );
};
export default Orders;
