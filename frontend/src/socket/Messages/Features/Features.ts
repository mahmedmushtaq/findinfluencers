import socket from "../../Socket";
import { Subjects } from "../../Subjects";
import CheckListener from "../CheckListener";
class Features {
  isUserLive(
    props: { userId?: string; username?: string; loggedInUserId: string },
    cb: Function
  ) {
    socket.socket?.emit(Subjects.IsUserLive, props);
    new CheckListener(socket.socket, { id: props.loggedInUserId }).listen(
      Subjects.IsUserLiveListener,
      cb
    );
  }

  loadOfflineMessages(loggedInUserId, cb: Function) {
    if (!socket.socket) return;
    console.log("load msg");
    new CheckListener(socket.socket, { id: loggedInUserId }).listen(
      Subjects.LoadOfflineMessages,
      cb
    );
  }

  loadConversations(loggedInUserId, cb: Function) {
    socket.socket?.emit(Subjects.LoadConversationsList);
    console.log("load conversation");
    new CheckListener(socket.socket, { id: loggedInUserId }).listen(
      Subjects.LoadConversationsListListener,
      cb
    );
  }

  getConversationId(
    payload: { userId: string; loggedInUserId: string },
    cb: Function
  ) {
    socket.socket?.emit(Subjects.GetConversationId, payload);
    new CheckListener(socket.socket, { id: payload.loggedInUserId }).listen(
      Subjects.GetConversationIdListener,
      cb
    );
  }

  stopIsUserLiveListener() {
    socket.socket?.off(Subjects.IsUserLiveListener);
  }
}

const features = new Features();
export default features;
