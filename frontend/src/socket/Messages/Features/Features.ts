import socket from "../../Socket";
import { Subjects } from "../../Subjects";
import CheckListener from "../CheckListener";
import { isUserLivePayload } from "./socketPayloadProps";
class Features {
  isUserLive(
    props: { userId?: string; username?: string; loggedInUserId: string },
    cb: Function
  ) {
    socket.socket?.emit(Subjects.IsUserLive, props);
    console.log("emitted");
    new CheckListener(socket.socket, { id: props.loggedInUserId }).listen(
      Subjects.IsUserLiveListener,
      cb
    );
  }

  stopIsUserLiveListener() {
    socket.socket?.off(Subjects.IsUserLiveListener);
  }
}

const features = new Features();
export default features;
