import { gql } from "@apollo/client";

// in order to load influencers

const SEARCH_QUERY = gql`
  query($input: SearchProfile, $pageNum: Int) {
    searchProfile(input: $input, pageNum: $pageNum) {
      id
      images
      category {
        name
      }
      platformProfileInfo {
        profileName
        profileUrl
        rate
        platform {
          name
        }
      }
      user {
        id
        full_name
        username
      }
    }
  }
`;

export default SEARCH_QUERY;
