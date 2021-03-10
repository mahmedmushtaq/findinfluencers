import { IResolvers } from "apollo-server-express";
import { authenticated, authorized } from "../../middlewares/auth";
import { Profile } from "../../models";
import { Category } from "../../models/category";
import { UserRole } from "../../models/user";

const CategoryResolver: IResolvers = {
  Query: {
    async categories() {
      const categories = await Category.find({});
      return categories;
    },
  },
  Mutation: {
    addCategory: authenticated(
      authorized(UserRole.admin, async (_: void, { input }: any) => {
        const category = Category.build({ name: input.name.toLowerCase() });
        await category.save();
        return category;
      })
    ),
  },

  Category: {
    async profile(parent) {
      const categoryId = parent.id;
      const profiles = await Profile.find({
        categoryIds: { $all: [categoryId] },
      });

      return profiles;
    },
  },
};

export default CategoryResolver;
