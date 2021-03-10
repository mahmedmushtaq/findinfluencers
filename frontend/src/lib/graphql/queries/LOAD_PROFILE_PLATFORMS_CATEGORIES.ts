import { gql } from "@apollo/client";

const LOAD_PROFILE_PLATFORMS_AND_CATEGORIES = gql`
  {
    platforms {
      id
      name
    }

    categories {
      id
      name
    }

    myProfile {
      id
      images
      description
      category {
        id
        name
      }
      platformProfileInfo {
        id
        profileUrl
        profileName
        profileFollowers
        rate
        platform {
          name
          id
        }
      }
    }
  }
`;

export default LOAD_PROFILE_PLATFORMS_AND_CATEGORIES;
