import { Grid, Box, Styled, Text, Flex } from "theme-ui";
import {
  ProtectedRouteHOC,
  InfluencerPanelStats,
} from "../../src/common/components";
import { useDispatch } from "react-redux";

import { PanelLayout } from "../../src/common/layouts";
import { TYPES } from "../../src/store/enums";

const InfluencerPanel = (props: any) => {
  const dispatch = useDispatch();
  dispatch({ type: TYPES.ADD_USER, payload: props.user });
  console.log("props user is = ", props.user);
  return (
    <PanelLayout>
      <Box sx={{}}>
        <InfluencerPanelStats />
      </Box>
    </PanelLayout>
  );
};

export default ProtectedRouteHOC(InfluencerPanel);
