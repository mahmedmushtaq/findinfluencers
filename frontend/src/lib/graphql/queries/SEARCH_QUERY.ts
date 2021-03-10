import { gql } from "@apollo/client";

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
        full_name
        username
      }
    }
  }
`;

export default SEARCH_QUERY;
