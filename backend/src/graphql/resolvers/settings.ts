import { ApolloError, IResolvers } from "apollo-server-express";
import { JWT } from "../../utils";
import { authenticated, authorized } from "../../middlewares/auth";
import { User } from "../../models";
import { Password } from "../../services/password";
import { contextType } from "../../types/apolloContextType";

const settingsResolver: IResolvers = {
  Mutation: {
    updateUser: authenticated(
      async (_: void, { input }: any, context: contextType) => {
        const {
          updateName,
          updateEmail,
          updatePassword,
          updateUsername,
        } = input;

        const user = await User.findById(context.user.id);
        if (!user) return;
        // to check any field is updated or not
        let updateAnyField;

        if (updatePassword) {
          user.password = updatePassword;
          updateAnyField = true;
        }
        if (updateEmail && user.email !== updateEmail) {
          // check this email is already present in another account
          const isEmailPresent = await User.findOne({
            email: updateEmail,
            _id: { $ne: context.user.id },
          });
          if (isEmailPresent) {
            throw new ApolloError("Email is already in Use");
          }
          user.email = updateEmail;
          updateAnyField = true;
        }

        // updateName Only if it is different from current name
        if (updateName && user.full_name !== updateName) {
          user.full_name = updateName;
          updateAnyField = true;
        }

        if (updateUsername && user.username !== updateUsername) {
          const isUsernameIsAlreadyPresent = await User.findOne({
            username: updateUsername,
            _id: { $ne: context.user.id },
          });
          if (isUsernameIsAlreadyPresent) {
            throw new ApolloError("username is already in use");
          }
          user.username = updateUsername;
          updateAnyField = true;
        }

        console.log("updateUsername = ", updateUsername);
        if (!updateAnyField) return user;

        await user.save();

        const token = await JWT.generateJWt({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        return {
          role: user.role,
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          token,
        };
      }
    ),
  },
};

export default settingsResolver;
