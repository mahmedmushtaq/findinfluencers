import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../lib/currentUser";
import { TYPES } from "../../../store/enums";
import { useEffect, useState, createContext } from "react";
import { socket } from "../../../socket";
// import { useToSocketConnection } from "../../../socket";

export const socketContext = createContext(undefined);

const usePanel = () => {
  const isUserPresentInStore = useSelector(
    (store: RootStateOrAny) => store.user
  );

  const [user, setUser] = useState(isUserPresentInStore);
  const [socketState, setSocketState] = useState<any>();

  const dispatch = useDispatch();
  //   const { connect, disconnect } = useToSocketConnection();

  useEffect(() => {
    // add currentLogin user to redux store when user refresh the page
    (async () => {
      // if user is already in store then return it
      if (isUserPresentInStore.token) {
        if (socketState) return;
        setSocketState(socket.connect(isUserPresentInStore));
        return;
      }
      // send user data to global state
      const res = await getCurrentUser({});
      dispatch({ type: TYPES.ADD_USER, payload: res });
      setUser(res);
      setSocketState(socket.connect(res));
    })();
  }, []);

  return { socket: socketState };

  //   useEffect(() => {
  //     if (user) {
  //       connect(user);
  //     }

  //     //return () => disconnect();
  //   }, [user]);
};

export default usePanel;
