import { gql } from "@apollo/client";

const LOAD_ORDER_BY_STATUS = gql`
  query orderByStatus($status: OrderStatus) {
    orderByStatus(status: $status) {
      id
      name
      createdAt
      status
      amount
      owner {
        id
        full_name
      }
      workingUser {
        id
        full_name
      }
    }
  }
`;

export default LOAD_ORDER_BY_STATUS;
