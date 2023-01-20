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
  return <Order isBusinessPanel statusList={statusList} />;
};
export default ProtectedRouteHOC(BusinessOrders, "buyer");
