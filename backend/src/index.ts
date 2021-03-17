import mongoose from "mongoose";
require("dotenv").config({});
import { app } from "./app";
import socket, { Socket } from "socket.io";

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

  http.listen(process.env.PORT, () => {
    console.log("Server is listening on the port ", process.env.PORT);
  });

  //@ts-ignore
  const io = socket(http, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(` =========== socket connected ========== ${socket.id}`);

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

start();
