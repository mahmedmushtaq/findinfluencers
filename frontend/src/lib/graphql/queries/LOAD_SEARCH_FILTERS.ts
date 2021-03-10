import { gql } from "@apollo/client";

const LOAD_SEARCH_FILTERS = gql`
  {
    platforms {
      id
      name
    }
    categories {
      id
      name
    }
    profileRates {
      rateRange
    }
  }
`;

export default LOAD_SEARCH_FILTERS;
