import mongoose from "mongoose";
require("dotenv").config({});
import { app } from "./app";
import { SocketConnection } from "./socket";

const http = require("http").createServer(app);

const start = async () => {
  console.log("starting up...");
  if (!process.env!.JWT_SECRET!) {
    throw new Error("JWT key must be valid");
  }

  try {
    await mongoose.connect(process.env!.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  const expressServer = app.listen(process.env.PORT, () => {
    console.log("Server is listening on the port ", process.env.PORT);
  });

  new SocketConnection(
    expressServer,
    process.env.ALLOW_CORS_DOMAIN!
  ).startServer();
};

start();
