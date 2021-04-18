import { gql } from "@apollo/client";

const LOAD_ESCROW_AMOUNT = gql`
  query myEscrow {
    myEscrow {
      escrows {
        id
        status
        order {
          amount
        }
      }
      amount
      billed
    }
  }
`;

export default LOAD_ESCROW_AMOUNT;
