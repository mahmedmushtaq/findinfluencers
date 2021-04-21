import { gql } from "@apollo/client";

const CREATE_PAYMENT_INTENT = gql`
  mutation createPaymentIntent($input: createPaymentIntentInput) {
    createPaymentIntent(input: $input) {
      client_secret
      id
      paymentIsAlreadyDone
    }
  }
`;

export default CREATE_PAYMENT_INTENT;
