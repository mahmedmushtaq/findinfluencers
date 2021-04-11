import { RootStateOrAny } from "react-redux";
import API from "./api";

const { useSelector } = require("react-redux");

const useApi = () => {
  const user = useSelector((store: RootStateOrAny) => store.user);
  const createChat = async (partnerId) => {
    
    try {
      const res = await API.post("/chats/create", {
        partnerId,
        authorization: `Bearer ${user.token}`,
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return { createChat };
};

export default useApi;
