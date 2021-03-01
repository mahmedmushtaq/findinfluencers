import mongoose from "mongoose";
import { transformMongooseResponse } from "../utils/utils";

interface CategoryAttrs {
  name: string;
}

// an interface that describe
//the properties of the usermodel

interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attrs: CategoryAttrs): CategoryDoc;
}

// mongoose returning object is different
// therefore we need to check its type and properties

interface CategoryDoc extends mongoose.Document, CategoryAttrs {}

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  transformMongooseResponse
);

CategorySchema.statics.build = (attrs: CategoryAttrs) => {
  return new Category(attrs);
};

const Category = mongoose.model<CategoryDoc, CategoryModel>(
  "category",
  CategorySchema
);

export { Category };
