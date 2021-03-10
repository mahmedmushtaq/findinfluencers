import { gql } from "@apollo/client";

const UPDATE_SETTINGS = gql`
  mutation($input: UpdateSettings!) {
    updateUser(input: $input) {
      id
      full_name
      email
      username
    }
  }
`;

export default UPDATE_SETTINGS;
