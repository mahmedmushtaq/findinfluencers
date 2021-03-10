import { gql } from "@apollo/client";

const LOAD_USER_PROFILE = gql`
  query($username: String) {
    userProfile(username: $username) {
      id
      user {
        full_name
        username
      }
      description
      category {
        name
      }
      images
      platformProfileInfo {
        profileName
        profileUrl
        profileFollowers
        rate
      }
    }
  }
`;

export default LOAD_USER_PROFILE;
