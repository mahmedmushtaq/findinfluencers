import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { JWT } from "./classes";
import path from "path";
import cors from "cors";

const app = express();

app.use("/public", express.static(path.join(__dirname + "/public")));

app.use(json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    const user = JWT.verifyJwt(token);

    return { user };
  },
});

server.applyMiddleware({ app, path: "/graphql" });

export { app };
