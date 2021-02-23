import { Box, Grid, Flex, Text } from "theme-ui";
import Logo from "../Logo/Logo";
const Footer = (props: any) => {
  return (
    <Grid
      columns={1}
      bg={"text"}
      color={"background"}
      style={{ height: 130 }}
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Box style={{}}>
        <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
          <div>
            <Logo />
          </div>
          <Text color="background" sx={{ fontFamily: "gilroyBold", ml: 3 }}>
            @Copyrights reserved
          </Text>
        </Flex>
      </Box>
      {/* <Box>
        <Text color="background" sx={{ fontFamily: "gilroyBold" }}>
          @Copyrights reserved
        </Text>
      </Box> */}
    </Grid>
  );
};

export default Footer;
