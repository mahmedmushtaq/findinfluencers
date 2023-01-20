import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { ProtectedRouteHOC } from "../../../src/common/components";
import chatService from "../../../src/modules/messages/services/chatService";
import Message from "../messages";
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../../src/lib/graphql";
import { useRouter } from "next/router";

const BusinessMessages = () => {
  return <Message isBusinessPanel={true} />;
};

export default ProtectedRouteHOC(BusinessMessages, "buyer");
