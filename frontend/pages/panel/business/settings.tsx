import { ProtectedRouteHOC } from "../../../src/common/components";
import Settings from "../settings";

const BusinessProfileSettings = (props) => {
  return <Settings isBusinessPanel {...props} />;
};

export default ProtectedRouteHOC(BusinessProfileSettings, "buyer");
