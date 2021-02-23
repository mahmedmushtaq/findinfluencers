import { Box, Grid, Styled } from "theme-ui";
import Item from "../HomeInfluencerGridItem/HomeInfluencerGridItem";
import { categories } from "./influencerDummyData";

const HomeInfluencerGrid = () => {
  return (
    <Box>
      {categories.map((singleCategory) => (
        <Box key={singleCategory.id} mt={2} mb={4}>
          <Styled.h2>{singleCategory.category}</Styled.h2>
          <Grid
            columns={[2, 3, 4]}
            sx={{ alignItems: "center", justifyItems: "center" }}
          >
            {singleCategory.items.map((singleItem) => (
              <Box key={singleItem.id}>
                <Item
                  name={singleItem.name}
                  platform={singleItem.platform}
                  category={singleItem.category}
                  title={singleItem.title}
                  slug={singleItem.slug}
                  image={singleItem.image}
                />
              </Box>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default HomeInfluencerGrid;
