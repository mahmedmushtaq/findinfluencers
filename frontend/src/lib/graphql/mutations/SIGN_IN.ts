import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation($input: SignInInput!) {
    signIn(input: $input) {
      token
    }
  }
`;
export default SIGN_IN;
