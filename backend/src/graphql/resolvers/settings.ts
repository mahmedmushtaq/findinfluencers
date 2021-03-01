import { IResolvers } from "apollo-server-express";
import { JWT } from "../../classes";
import { authenticated, authorized } from "../../middlewares/auth";
import { User } from "../../models";
import { Password } from "../../services/password";
import { contextType } from "../../types/apolloContextType";

const settingsResolver: IResolvers = {
  Mutation: {
    updateUser: authenticated(
      async (_: void, { input }: any, context: contextType) => {
        const { updateName, updateEmail, updatePassword } = input;
        const user = await User.findById(context.user.id);
        if (!user) return;
        if (updatePassword) {
          const hashedPassword = await Password.toHash(updatePassword);
          user.password = hashedPassword;
        }
        user.email = updateEmail;
        user.full_name = updateName;
        await user.save()

        const token = await JWT.generateJWt({id: user.id,email:user.email,role: user.role})
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
