import { gql } from "@apollo/client";

const SAVE_PAYMENT_INTENT = gql`
  mutation savePaymentIntent($input: savePaymentIntentInput ) {
    savePaymentIntent(input: $input) {
      id
    }
  }
`;

export default SAVE_PAYMENT_INTENT;
