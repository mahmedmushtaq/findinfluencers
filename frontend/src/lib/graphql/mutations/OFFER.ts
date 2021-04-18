import { gql } from "@apollo/client";

export const SET_OFFER_STATUS = gql`
  mutation($input: OfferStatusInput!) {
    setOfferStatus(input: $input) {
      id
    }
  }
`;

// export const ACCEPT_OFFER = gql`
//   mutation($orderId: String!) {
//     acceptOffer(orderId: $orderId) {
//       id
//     }
//   }
// `;
