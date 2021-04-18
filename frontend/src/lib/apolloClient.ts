import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import getConfig from "next/config";
import { createUploadLink } from "apollo-upload-client";

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
  // const errorPolicy = onError(({ graphQLErrors, networkError }) => {
  //   if (graphQLErrors)
  //     graphQLErrors.forEach(({ message, locations, path }) => {
  //       throw new Error(message);
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       );
  //     });

  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });

  // const httpLink = new HttpLink({
  //   uri: "http://localhost:4000/graphql", // e.g. https://www.myapi.com/api/v2
  //   headers: {},
  // });

  const token = () => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("token");
    }
    return "";
  };

  const httpLink = createUploadLink({
    uri: "http://localhost:4000/graphql", //process.env.GRAPHQL_SERVER_HOST,
    headers: {
      authorization: token(),
    },
  });
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httpLink, //errorPolicy.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
