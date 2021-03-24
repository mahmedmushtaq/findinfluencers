import { Box } from "theme-ui";
import { PanelGlobalState, SocketContext } from "../../../context";
import { Footer, PanelNavBar, OfferBar } from "../../components";
import { usePanel } from "../../hooks";

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
  //const { state, dispatch } = panelState;

  return (
    <SocketContext.Provider value={socket}>
      {/* <PanelGlobalState.Provider value={{ state, dispatch }}> */}
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
      {/* </PanelGlobalState.Provider> */}
    </SocketContext.Provider>
  );
};

export default PanelLayout;
