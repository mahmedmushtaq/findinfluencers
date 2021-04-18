import { gql } from "@apollo/client";

const ORDER_INFORMATION = gql`
  query orderInformation($input: OrderInformationInput!) {
    orderInformation(input: $input) {
      id
      createdAt
      description
      name
      amount
      status
      workingUser{
        full_name
        id
      }
      owner {
        full_name
        id
      }
      platformProfile {
        profileName
        profileUrl
        profileFollowers
      }
    }
  }
`;

export default ORDER_INFORMATION;
