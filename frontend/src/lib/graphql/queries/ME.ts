import { gql } from "@apollo/client";

const ME = gql`
  {
    me {
      id
      email
      full_name
      username
    }
  }
`;

export default ME;
