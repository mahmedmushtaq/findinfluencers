import {
  IResolvers,
  AuthenticationError,
  ApolloError,
  IResolversParameter,
} from "apollo-server-express";
import { User, UserRole } from "../../models/user";
import { JWT } from "../../utils";
import { authenticated } from "../../middlewares/auth";
import { contextType } from "../../types/apolloContextType";
import { Password } from "../../services/password";
import slug from "slug";
import randomstring from "randomstring";
import { newUserEvent } from "../../events";

const userResolver = {
  Query: {
    me: authenticated(async (_: void, _1: void, context: contextType) => {
      // get all data by id
      const user = await User.findById(context.user.id);

      return user;
    }),

    searchUser: async (_: void, { input }: any) => {
      if (!input) return;
      let user;
      if (input.userId) {
        user = await User.findById(input.userId);
      } else {
        user = await User.findOne({ username: input.username });
      }

      return user;
    },
  },

  Mutation: {
    async signUp(_: void, { input }: any) {
      const { full_name, email, password, role } = input;

      if (role === UserRole.admin) {
        throw new ApolloError("Only admin can make a new admin");
      }
      // check if user is already present then throw error
      const isUserPresent = await User.findOne({ email });
      if (isUserPresent) {
        throw new ApolloError("Email is already in use");
      }

      let username = slug(full_name) + randomstring.generate(7);
      const user = User.build({
        full_name,
        email,
        password,
        role: role,
        username,
      });
      await user.save();
      const token = await JWT.generateJWt({
        id: user.id,
        email: user.email,
        role,
      });

      // now send new user event to other services

      newUserEvent({
        firstName: user.full_name,
        email: user.email,
        id: user.id,
        password,
      });

      return {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        role: user.role,
        token,
      };
    },

    async signIn(_: void, { input }: any) {
      const { email, password } = input;

      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const isCorrectPassword = await Password.compare(user.password, password);
      if (!isCorrectPassword) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = await JWT.generateJWt({
        id: user.id,
        email,
        role: user.role,
      });

      return {
        role: user.role,
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        token,
      };
    },
  },
};

export default userResolver;

// const Query = {};

// /**
//  * @contains signUp, signIn methods
//  *
//  */
// const Mutation: IResolvers["Mutation"] = {};

// export { Query as userQuery, Mutation as userMutation };
