import { Box } from "theme-ui";
import { Footer, Header, OfferBar } from "../../components";
import useWidthMediaQuery from "../../hooks/useWidthMediaQuery";

const FrontLayout = (props: {
  bodyTopMargin?: number;
  showHeader?: boolean;
  children?: any;
}) => {
  const { showHeader, children } = props;
  const isHeaderShow = showHeader === undefined ? true : showHeader;
  const bodyTopMargin =
    props.bodyTopMargin === undefined ? 100 : props.bodyTopMargin;
  const { isBigLargestScreen, isMiniLaptopScreen, isSmallLaptopScreen } = useWidthMediaQuery();

  const largeScreenWidth = isBigLargestScreen
    ? "70%"
    : isSmallLaptopScreen || isSmallLaptopScreen
    ? "95%"
    : "85%";

  return (
    <Box sx={{ backgroundColor: "white" }}>
      {/* <Box>
        <OfferBar />
      </Box> */}
      <Box>{isHeaderShow && <Header />}</Box>
      <Box
        sx={{
          marginTop: bodyTopMargin,
          width: ["85%", "95%", largeScreenWidth],
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </Box>
      <Box mt={5}>
        <Footer />
      </Box>
    </Box>
  );
};

export default FrontLayout;
