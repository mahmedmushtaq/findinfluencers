import mongoose from "mongoose";
require("dotenv").config({});
import { app } from "./app";

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

  app.listen(3000, () => {
    console.log("Server is listening on the port 3000");
  });
};

start();
