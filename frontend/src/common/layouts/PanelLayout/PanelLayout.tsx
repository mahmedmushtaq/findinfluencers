import { Box } from "theme-ui";
import { Footer, PanelNavBar, OfferBar } from "../../components";
import usePanel from "./usePanel";
import { socketContext } from "./usePanel";

const PanelLayout = (props: {
  bodyTopMargin?: number;
  showHeader?: boolean;
  children?: any;
  fullWidth?: boolean;
  layoutFullHeight?: boolean;
  businessPanel?: boolean;
}) => {
  const { showHeader, children, fullWidth, layoutFullHeight } = props;
  const isHeaderShow = showHeader === undefined ? true : showHeader;
  const bodyTopMargin =
    props.bodyTopMargin === undefined ? 50 : props.bodyTopMargin;

  const root = {
    width: !fullWidth ? ["85%", "95%", "85%"] : "100%",
  };

  // set usePanel hook
  const { socket } = usePanel();

  return (
    <socketContext.Provider value={socket}>
      <div
        style={{
          backgroundColor: "white",
          height: layoutFullHeight ? "100vh" : undefined,
          overflow: layoutFullHeight ? "hidden" : undefined,
        }}
      >
        <Box>
          <OfferBar />
        </Box>
        <Box>
          {isHeaderShow && <PanelNavBar businessNavBar={props.businessPanel} />}
        </Box>
        <Box
          sx={{
            height: "100%",
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
      </div>
    </socketContext.Provider>
  );
};

export default PanelLayout;
