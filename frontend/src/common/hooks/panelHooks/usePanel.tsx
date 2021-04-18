import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../lib/currentUser";

import { useEffect, useState } from "react";

import { loginUserAction } from "../../../store/actions";
import useSocket from "./useSocket";

import router from "next/router";

const usePanel = () => {
  const isUserPresentInStore = useSelector(
    (store: RootStateOrAny) => store.user
  );

  const [showNotification, setShowNotification] = useState("");

  const dispatch = useDispatch();
  const { state, setState } = useSocket(isUserPresentInStore);

  useEffect(() => {
    (async () => {
      if (isUserPresentInStore.token) return;
      // send user data to global state
      const res = await getCurrentUser({});
      console.log("dispatch data ", res);
      dispatch(loginUserAction(res));
    })();
  }, []);

  useEffect(() => {
    if (!state.notMsg) return;

    setShowNotification(state.notMsg);
  }, [state]);

  const openNotificationAlert = () => {
    setShowNotification("");
    setState((prevState) => ({ ...prevState, notMsg: "" }));
    setTimeout(() => {
      const routeUrl = router.router.route.includes("business")
        ? "/panel/business/notifications"
        : "/panel/notifications";

      router.push(routeUrl);
    }, 100);
  };

  return { showNotification, openNotificationAlert };
};

export default usePanel;
