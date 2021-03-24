import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../lib/currentUser";
import { TYPES } from "../../../store/enums";
import { useEffect, useState } from "react";
import { features, messages, socket } from "../../../socket";
import useSocketListeners from "./useSocketListeners";

const usePanel = () => {
  const isUserPresentInStore = useSelector(
    (store: RootStateOrAny) => store.user
  );

  const [socketState, setSocketState] = useState<any>();
  // const { state, dispatch } = useSocketListeners({
  //   socket: socketState,
  // });
  useSocketListeners({ socket: socketState });

  const reduxDispatch = useDispatch();

  //   const { connect, disconnect } = useToSocketConnection();

  useEffect(() => {
    console.log("panel useEffect ");
    // add currentLogin user to redux store when user refresh the page
    (async () => {
      // if user is already in store then return it
      if (isUserPresentInStore.token) {
        console.log(isUserPresentInStore);
        if (socketState) return;
        setSocketState(socket.connect(isUserPresentInStore));
        return;
      }
      // send user data to global state
      const res = await getCurrentUser({});
      reduxDispatch({ type: TYPES.ADD_USER, payload: res });
      if (res.token) {
        const _sock = socket.connect(res);

        // when user comes back to online then
        features.loadOfflineMessages(res.id, (data) => {
          console.log(
            " ==================  offline message data ===================  ",
            data
          );
        });
        setSocketState(_sock);
      }
    })();

    // return () => {
    //   if (socket) {
    //     socket.dispose()
    //     socket.disconnect();
    //   }
    // };
  }, []);

  // const panelState = { state, dispatch };

  return { socket: socketState };

  //   useEffect(() => {
  //     if (user) {
  //       connect(user);
  //     }

  //     //return () => disconnect();
  //   }, [user]);
};

export default usePanel;
