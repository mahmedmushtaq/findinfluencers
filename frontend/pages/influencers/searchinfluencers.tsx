import { Box, Styled, Text } from "theme-ui";
import { FrontLayout } from "../../src/common/layouts";
import { SearchInfluencerGrid } from "../../src/common/components";

const SearchInfluencers = () => {
  return (
    <FrontLayout>
      <Box>
        <Text>Influencers</Text>
        <SearchInfluencerGrid />
      </Box>
    </FrontLayout>
  );
};

export default SearchInfluencers;
