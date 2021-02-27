import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/simplefile";
import { errorHandler } from "./middlewares";

const app = express();

app.use(json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app, path:"/graphql" });

// app.all("*", async () => {
//   throw new NotFoundError();
// });

app.use(errorHandler);

export { app };
