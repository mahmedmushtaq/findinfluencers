import { Box } from "theme-ui";
import { Footer, PanelNavBar } from "../../components";

const root = {
  width: ["85%", "95%", "85%"],
};

const PanelLayout = (props: {
  bodyTopMargin?: number;
  showHeader?: boolean;
  children?: any;
}) => {
  const { showHeader, children } = props;
  const isHeaderShow = showHeader === undefined ? true : showHeader;
  const bodyTopMargin =
    props.bodyTopMargin === undefined ? 100 : props.bodyTopMargin;

  return (
    <Box
      sx={{
        backgroundColor: "white",
      }}
    >
      <Box
        sx={
          {
            //   position: "relative",
            //   overflow: "hidden",
          }
        }
      >
        {isHeaderShow && <PanelNavBar />}
      </Box>
      <Box
        sx={{
          marginTop: bodyTopMargin,
          ...root,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </Box>
      {/* <Box mt={5}>
        <Footer />
      </Box> */}
    </Box>
  );
};

export default PanelLayout;
