import mongoose from "mongoose";
import { Password } from "../services/password";

export enum UserRole {
  influencer = "influencer",
  buyer = "buyer",
  admin = "admin",
}

interface UserAttr {
  full_name: string;
  role: UserRole;
  email: string;
  password: string;
  profile_pic?: string;
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
    role: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
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
