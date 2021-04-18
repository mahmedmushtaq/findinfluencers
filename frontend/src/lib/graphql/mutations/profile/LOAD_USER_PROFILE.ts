import { gql } from "@apollo/client";

const LOAD_USER_PROFILE = gql`
  query($input: userProfileInput) {
    userProfile(input: $input) {
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
        platform {
          name
        }
      }
    }
  }
`;

export default LOAD_USER_PROFILE;
