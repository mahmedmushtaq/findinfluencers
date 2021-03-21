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
        id
        profileName
        profileUrl
        profileFollowers
        rate
        platform{
          name
        }
      }
    }
  }
`;

export default LOAD_USER_PROFILE;
