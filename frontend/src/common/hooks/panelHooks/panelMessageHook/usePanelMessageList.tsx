import { useContext, useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { SocketContext } from "../../../../context";
import { CHATTYPES } from "../../../../store/enums";
import { useDispatch } from "react-redux";

const usePanelMessageList = () => {
  const socket = useContext(SocketContext);
  const { user, chat } = useSelector((store: RootStateOrAny) => store);
  // const [data, setData] = useState();
  // const [conversationsData, setConversationsData] = useState<
  //   LoadConversationsListPayloadType[]
  // >([]);

  // const dispatch = useDispatch();

  // const socketListener = () => {
  //   if (!socket) return;

  //   features.loadConversations(
  //     user.id,
  //     (data: { payload: LoadConversationsListPayloadType[] }) => {
  //       console.log(
  //         " ========= conversation data.payload ========= ",
  //         data.payload
  //       );
  //       //setConversationsData(data.payload);
  //       dispatch({ type: CHATTYPES.ADD_CONVERSATIONS, payload: data.payload });
  //     }
  //   );
  // };

  // useEffect(() => {
  //   setConversationsData(chat.conversations);
  // }, [chat.conversations]);

  // useEffect(() => {
  //   socketListener();
  // }, [socket]);

  // const state = { conversationsData, user };
  const state = { user };

  return { state };
};

export default usePanelMessageList;
