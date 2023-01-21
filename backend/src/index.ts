import mongoose from "mongoose";
require("dotenv").config({});
import { app } from "./app";
import { SocketConnection } from "./socket";

let socketCon: SocketConnection;

const start = async () => {
  console.log("starting up...");
  if (!process.env!.JWT_SECRET!) {
    throw new Error("JWT key must be valid");
  }

  console.log(process.env!.MONGODB_URI!);

  try {
    await mongoose.connect(process.env!.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: false,
      useFindAndModify: false,
    });

    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  const expressServer = app.listen(8080, () => {
    console.log("Server is listening on the port ", process.env.PORT);
  });

  socketCon = new SocketConnection(expressServer, "*");
  socketCon.startServer();
};

start();

export { socketCon };
