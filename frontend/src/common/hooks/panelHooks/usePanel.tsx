import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../lib/currentUser";

import { useEffect, useState } from "react";

import { loginUserAction } from "../../../store/actions";

const usePanel = () => {
  const isUserPresentInStore = useSelector(
    (store: RootStateOrAny) => store.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isUserPresentInStore.token) return;
      // send user data to global state
      const res = await getCurrentUser({});
      console.log("dispatch data ", res);
      dispatch(loginUserAction(res));
    })();
  }, []);
};

export default usePanel;
