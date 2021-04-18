import { gql } from "@apollo/client";

const CREATE_OFFER = gql`
  mutation createOffer($input: OrderInput!) {
    createOffer(input: $input) {
      id
    }
  }
`;

export default CREATE_OFFER;
