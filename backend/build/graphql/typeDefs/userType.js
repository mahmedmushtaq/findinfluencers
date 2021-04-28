"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var userType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  enum Role {\n    admin\n    influencer\n    buyer\n  }\n  type User {\n    id: ID!\n    full_name: String\n    email: String\n    role: Role\n    token: String\n    username: String\n  }\n\n  input SignUpInput {\n    full_name: String!\n    email: String!\n    password: String!\n    role: Role!\n  }\n\n  input SignInInput {\n    email: String\n    password: String\n  }\n\n  input SearchUserInput {\n    userId: String\n    username: String\n  }\n\n  extend type Query {\n    me: User!\n    searchUser(input: SearchUserInput): User!\n  }\n  extend type Mutation {\n    signUp(input: SignUpInput!): User!\n    signIn(input: SignInInput!): User!\n  }\n"], ["\n  enum Role {\n    admin\n    influencer\n    buyer\n  }\n  type User {\n    id: ID!\n    full_name: String\n    email: String\n    role: Role\n    token: String\n    username: String\n  }\n\n  input SignUpInput {\n    full_name: String!\n    email: String!\n    password: String!\n    role: Role!\n  }\n\n  input SignInInput {\n    email: String\n    password: String\n  }\n\n  input SearchUserInput {\n    userId: String\n    username: String\n  }\n\n  extend type Query {\n    me: User!\n    searchUser(input: SearchUserInput): User!\n  }\n  extend type Mutation {\n    signUp(input: SignUpInput!): User!\n    signIn(input: SignInInput!): User!\n  }\n"])));
exports.default = userType;
var templateObject_1;
