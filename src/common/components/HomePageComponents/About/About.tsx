import { Grid, Styled, Box, Text } from "theme-ui";

const About = () => {
  return (
    <Grid
      sx={{
        textAlign: "center",
        width: ["60%"],

        margin: "auto",
      }}
    >
      <Styled.h1>How May We Help You?</Styled.h1>
      <Text>
        According to Forbes, influencer marketing is growing faster than digital
        ads. We will help you to find influencers and set your budget with them and
        help you during this procedure.
      </Text>
    </Grid>
  );
};

export default About;
