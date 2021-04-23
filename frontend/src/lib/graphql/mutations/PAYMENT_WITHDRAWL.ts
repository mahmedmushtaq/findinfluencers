import { gql } from "@apollo/client";

const PAYMENT_WITHDRAWL = gql`
  mutation paymentWithdrawl($input: paymentWithdrawlInput) {
    paymentWithdrawl(input: $input) {
      id
    }
  }
`;

export default PAYMENT_WITHDRAWL;
