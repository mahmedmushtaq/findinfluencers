import { gql } from "@apollo/client";

const SEARCH_USER = gql`
  query searchUserQuery($input: SearchUserInput) {
    searchUser(input: $input) {
      id
      username
      full_name
      token
    }
  }
`;

export default SEARCH_USER;
