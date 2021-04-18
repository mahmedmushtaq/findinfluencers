import { useEffect, useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { ProtectedRouteHOC } from "../../../src/common/components";
import chatService from "../../../src/modules/messages/services/chatService";
import Message from "../messages";
import { useQuery } from "@apollo/client";
import { SEARCH_USER } from "../../../src/lib/graphql";
import { useRouter } from "next/router";

const BusinessMessages = () => {
  // const socket = useSelector(
  //   (state: RootStateOrAny) => state.chatReducer.socket
  // );
  // const router = useRouter();
  // const username = router.query.user;

  // const { data, error } = useQuery(SEARCH_USER, {
  //   variables: { input: { username } },
  //   errorPolicy: "all",
  // });

  // const addNewFriend = async (id) => {
  //   try {
  //     // const chats = await chatService.createChat(id);
  //     // socket.emit("add-friend", chats);
  //     // setShowFriendsModal(false);
  //   } catch (err) {}
  // };

  // // useEffect(() => {
  // //   if (!data) return;
  // //   console.log("data is = ", data.searchUser);
  // //   addNewFriend(data.searchUser.id);
  // // }, [data]);

  // useEffect(() => {
  //   console.log("error is = ", error);
  // }, [error]);

  return <Message isBusinessPanel={true} />;
};

export default ProtectedRouteHOC(BusinessMessages, "buyer");
