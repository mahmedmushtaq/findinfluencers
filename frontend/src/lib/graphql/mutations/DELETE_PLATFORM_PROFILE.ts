import { gql } from "@apollo/client";

const DELETE_PLATFORM_PROFILE = gql`
  mutation($id: String!) {
    deletePlatformProfile(id: $id) {
      id
    }
  }
`;

export default DELETE_PLATFORM_PROFILE;
