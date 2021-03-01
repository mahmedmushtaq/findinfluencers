import { AuthenticationError } from "apollo-server-express";
import { UserRole } from "../models/user";
import { contextType } from "../types/apolloContextType";

/**
 * checks if the user is on the context object
 * continues to the next resolver if true
 * @param {Function} next next resolver function ro run
 */

export const authenticated = (next: Function) => (
  root: any,
  args: any,
  context: { user: string | undefined },
  info: any
) => {
  if (!context.user) {
    throw new AuthenticationError("Invalid Token");
  }
  return next(root, args, context, info);
};

/**
 * checks if the user on the context has the specified role.
 * continues to the next resolver if true
 * @param {String} role enum role to check for
 * @param {Function} next next resolver function to run
 */
export const authorized = (role: UserRole, next: Function) => (
  root: any,
  args: any,
  context: contextType,
  info: any
) => {
  if (role !== context.user.role) {
    throw new AuthenticationError(
      "You are not authorized to access this feature"
    );
  }

  return next(root, args, context, info);
};
