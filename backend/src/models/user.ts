import mongoose from "mongoose";
import { Password } from "../services/password";
import { transformMongooseResponse } from "../utils/utils";

export enum UserRole {
  influencer = "influencer",
  buyer = "buyer",
  admin = "admin",
}

interface UserAttr {
  full_name: string;
  role: UserRole;
  email: string;
  username: string;
  password: string;
  profile_pic?: string;
  stripe_customer?: string;
}

// an interface that describe
//the properties of the usermodel

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttr): UserDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface UserDoc extends mongoose.Document, UserAttr {}

const UserSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
    },
    stripe_customer: {
      type: String,
    },
  },
  transformMongooseResponse
);

// hash password before save

UserSchema.pre("save", async function (done: Function) {
  //@ts-ignore
  if (this.isModified("password")) {
    //@ts-ignore
    const hashed = await Password.toHash(this.get("password"));
    //@ts-ignore
    this.set("password", hashed);
  }

  done();
});

// build user is used to strictly check
// type checking and properties of object

UserSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", UserSchema);

export { User };
