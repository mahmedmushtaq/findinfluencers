import { ProtectedRouteHOC } from "../../../src/common/components";
import Message from "../messages";

const BusinessMessages = () => {
  return <Message isBusinessPanel={true} />;
};

export default ProtectedRouteHOC(BusinessMessages, "buyer");
