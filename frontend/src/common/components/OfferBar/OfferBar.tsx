import { Box, Grid, Flex, Text } from "theme-ui";

const OfferBar = () => {
  return (
    <Grid
      bg="text"
      color="background"
      sx={{ height: 60, alignItems: "center" }}
    >
      <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
        <Text mr={3} sx={{ fontSize: [3, 4], fontFamily: "gilroyBold" }}>
          5% charges on
        </Text>
        <Text sx={{}}>our first 1000 influencers</Text>
      </Flex>
    </Grid>
  );
};

export default OfferBar;
