"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = exports.authenticated = void 0;
var apollo_server_express_1 = require("apollo-server-express");
/**
 * checks if the user is on the context object
 * continues to the next resolver if true
 * @param {Function} next next resolver function ro run
 */
var authenticated = function (next) { return function (root, args, context, info) {
    if (!context.user) {
        throw new apollo_server_express_1.AuthenticationError("Invalid Token");
    }
    return next(root, args, context, info);
}; };
exports.authenticated = authenticated;
/**
 * checks if the user on the context has the specified role.
 * continues to the next resolver if true
 * @param {String} role enum role to check for
 * @param {Function} next next resolver function to run
 */
var authorized = function (role, next) { return function (root, args, context, info) {
    if (role !== context.user.role) {
        throw new apollo_server_express_1.AuthenticationError("You are not authorized to access this feature");
    }
    return next(root, args, context, info);
}; };
exports.authorized = authorized;
