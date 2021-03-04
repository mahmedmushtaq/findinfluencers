import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql", // e.g. https://www.myapi.com/api/v2
      headers: {
        authorization: token,
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
