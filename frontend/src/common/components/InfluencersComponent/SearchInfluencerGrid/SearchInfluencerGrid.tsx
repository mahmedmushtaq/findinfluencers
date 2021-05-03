import { useLazyQuery, useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { Box, Grid, Spinner, Flex, Button, Text } from "theme-ui";
import { SEARCH_QUERY } from "../../../../lib/graphql";
import Item from "../SearchInfluencerGridItem/SearchInfluencerGridItem";
import { categories } from "./influencerDummyData";
import { useRouter } from "next/router";

const SearchInfluencerGrid = (props: any) => {
  // const { category, platform, rate } = props;
  const router = useRouter();

  const category = router.query.category ?? "any";
  const platform = router.query.platform ?? "any";

  const rate = router.query.rate ?? [];

  const [loadSearchData, { error, loading, data }] = useLazyQuery(
    SEARCH_QUERY,
    {
      errorPolicy: "all",
    }
  );

  const loadSearchDataCallBack = useCallback(async () => {
    const pageNum = +router.query.pageNum || 0;

    loadSearchData({
      variables: {
        input: {
          platformName: platform,
          categoryName: category,
          rateRange: rate.length > 0 ? [+rate[0], +rate[1]] : [],
        },
        pageNum,
      },
    });
  }, [router.query.pageNum]);

  useEffect(() => {
    loadSearchDataCallBack();
  }, [loadSearchDataCallBack]);

  const loadMore = () => {
    // increase PageNum
    // loadSearchDataCallBack(page);

    const increasePageNum = router.query.pageNum
      ? +router.query.pageNum + 1
      : 1;
    router.push({
      pathname: "/influencers/searchinfluencers",
      query: { ...router.query, pageNum: increasePageNum },
    });
  };

  const loadPreviousOne = () => {
    const decPageNum = router.query.pageNum ? +router.query.pageNum - 1 : 1;
    router.push({
      pathname: "/influencers/searchinfluencers",
      query: { ...router.query, pageNum: decPageNum },
    });
  };
  return (
    <Box>
      {loading ? (
        <Spinner sx={{ marginLeft: "auto", marginRight: "auto" }} />
      ) : (
        <Box>
          <Box mt={2} mb={4}>
            <Grid
              columns={[2, 3, 4]}
              sx={{ alignItems: "center", justifyItems: "center" }}
            >
              {data?.searchProfile &&
                data.searchProfile.map((singleProfileData) => (
                  <Box key={singleProfileData.id}>
                    <Item data={singleProfileData} />
                  </Box>
                ))}
            </Grid>
          </Box>
          <Flex mt={4} sx={{ justifyContent: "center" }}>
            {data && data.searchProfile && (
              <Button
                sx={{ ":focus": { outline: "none" }, cursor: "pointer" }}
                onClick={
                  data.searchProfile.length > 0 ? loadMore : loadPreviousOne
                }
              >
                <Text>
                  {data.searchProfile.length > 0 ? "Load More" : "Back"}
                </Text>
              </Button>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default SearchInfluencerGrid;
