import { gql } from "@apollo/client";

const UPDATE_PROFILE_INFO = gql`
  mutation($input: ProfileInput, $images: [Upload]) {
    updateProfileInfo(input: $input, images: $images) {
      id
    }
  }
`;

export default UPDATE_PROFILE_INFO;
