import mongoose from "mongoose";
import { Password } from "../services/password";

interface PlatformAttrs {
  name: string;
  icon: string;
}

// an interface that describe
//the properties of the usermodel

interface PlatformModel extends mongoose.Model<PlatformDoc> {
  build(attrs: PlatformAttrs): PlatformDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface PlatformDoc extends mongoose.Document, PlatformAttrs {}

const PlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

PlatformSchema.statics.build = (attrs: PlatformAttrs) => {
  return new Platform(attrs);
};

const Platform = mongoose.model<PlatformDoc, PlatformModel>(
  "platform",
  PlatformSchema
);

export { Platform };
