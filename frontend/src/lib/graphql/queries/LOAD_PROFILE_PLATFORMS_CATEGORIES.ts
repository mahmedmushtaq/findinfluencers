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

    myProfile{
    id
    images
    category{
      id
      name
    }
     platformProfileInfo{
      id
      profileUrl
      profileName
      profileFollowers
      platform{
        name
        id
        
      }
    }
   
  }
  }
`;

export default LOAD_PROFILE_PLATFORMS_AND_CATEGORIES;
