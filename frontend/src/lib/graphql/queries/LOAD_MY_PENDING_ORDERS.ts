import { gql } from "@apollo/client";

const LOAD_MY_PENDING_ORDERS = gql`
  query myPendingOrders {
    myPendingOrders {
      id
      name
      createdAt
      status
      amount
    }
  }
`;

export default LOAD_MY_PENDING_ORDERS;
