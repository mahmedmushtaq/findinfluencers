import { gql } from "@apollo/client";

const ADD_PROFILE_INFO = gql`
  mutation addProfileInfo($input: ProfileInput!, $images: [Upload!]!) {
    addProfileInfo(input: $input, images: $images) {
      id
    }
  }
`;

export default ADD_PROFILE_INFO;
