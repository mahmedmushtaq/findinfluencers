import { useMutation } from "@apollo/client";
import { Flex, Spinner, Box, Text } from "@theme-ui/components";
import { useState } from "react";
import { SET_OFFER_STATUS } from "../../../../lib/graphql";
import CustomButton from "../../CustomButton/CustomButton";

const AcceptOrRejectOffer = (props) => {
  const [setOffer, { data, error, loading }] = useMutation(SET_OFFER_STATUS, {
    errorPolicy: "all",
  });

  const [orderStatus, setOrderStatus] = useState("");

  const { ordersData } = props;

  //   const [
  //     acceptOffer,
  //     {
  //       data: acceptOfferData,
  //       loading: acceptOfferLoading,
  //       error: acceptOfferError,
  //     },
  //   ] = useMutation(ACCEPT_OFFER, {
  //     errorPolicy: "all",
  //   });
  //   const rejectOfferBtn = () => {
  //     if (!ordersData) return;
  //     console.log(ordersData.id);
  //     rejectOffer({ variables: { orderId: ordersData.id } });
  //   };

  const setOfferStatus = (status: "working" | "rejected") => {
    if (!ordersData) return;
    console.log(ordersData.id);
    setOffer({ variables: { input: { orderId: ordersData.id, status } } });
    setOrderStatus(status === "working" ? "accepted" : status);
  };

  return (
    <Box>
      {data && (
        <Text color="primary">
          You have successfully {orderStatus} the order
        </Text>
      )}
      {error && <Text color="primary">{error.message}</Text>}
      <Flex mt={2} sx={{ justifyContent: "center" }}>
        <CustomButton
          onClick={() => {
            setOfferStatus("working");
          }}
        >
          {" "}
          Accept
        </CustomButton>
        {/* {acceptOfferLoading && <Spinner ml={2} mr={3} />} */}
        <CustomButton
          ml={2}
          bg="secondary"
          onClick={() => {
            setOfferStatus("rejected");
          }}
        >
          Reject
        </CustomButton>
        {loading && <Spinner />}
      </Flex>
    </Box>
  );
};

export default AcceptOrRejectOffer;
