import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
import { JWT } from "./utils";
import path from "path";
import cors from "cors";
import { messagesRouter } from "./routes";

const app = express();
app.use(cors());

app.use("/public", express.static(path.join(__dirname + "/../public")));

app.use(json());

app.use("/api/messages", messagesRouter);
// app.use(cors());

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
