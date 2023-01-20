import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_ORDER_BY_STATUS, SET_OFFER_STATUS } from "../../../lib/graphql";

export interface type {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  amount: string;
  owner: {
    id: string;
    full_name: string;
  };
  workingUser: {
    id: string;
    full_name: string;
  };
}

const useOrder = (props: { orderStatus }) => {
  const { orderStatus } = props;
  const [loadOfferByStatus, { called, loading, data }] = useLazyQuery(
    LOAD_ORDER_BY_STATUS,
    {
      variables: { status: orderStatus.key },
      errorPolicy: "all",
      fetchPolicy: "network-only",
    }
  );

  const [
    setOfferStatus,
    {
      data: submitForPaymentData,
      error: submitForPaymentError,
      loading: setOfferStatusLoading,
    },
  ] = useMutation(SET_OFFER_STATUS, {
    errorPolicy: "all",
  });

  const [orderList, setOrderList] = useState<[]>([]);

  useEffect(() => {
    loadOfferByStatus();
  }, [orderStatus]);

  useEffect(() => {
    if (!data) return;

    setOrderList(data.orderByStatus);
  }, [data]);

  useEffect(() => {
    if (!submitForPaymentData) return;
    const orderId = submitForPaymentData.setOfferStatus.id;
    const filterOrderList: type[] = orderList.filter(
      //@ts-ignore
      (order) => order.id !== orderId
    );
    //@ts-ignore
    setOrderList(filterOrderList);
  }, [submitForPaymentData]);

  return {
    orderList,
    setOrderList,
    setOfferStatusLoading,
    setOfferStatus,
    loading,
  };
};

export default useOrder;
