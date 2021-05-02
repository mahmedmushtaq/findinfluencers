import { Box, Button, Styled, Text, Flex } from "theme-ui";
import { FrontLayout } from "../../src/common/layouts";
import { SearchInfluencerGrid } from "../../src/common/components";
import { useRouter } from "next/router";

const SearchInfluencers = () => {
  return (
    <FrontLayout>
      <Box>
        <Box mb={4}>
          <Styled.h3>HireInfluencerss</Styled.h3>
        </Box>
        <SearchInfluencerGrid />
      </Box>
    </FrontLayout>
  );
};

export default SearchInfluencers;
