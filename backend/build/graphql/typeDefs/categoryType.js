"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var categoryType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Category {\n    name: String\n    id: ID!\n    profile: [Profile]\n  }\n\n  input CategoryInput {\n    name: String!\n  }\n\n  extend type Query {\n    categories: [Category]!\n  }\n\n  extend type Mutation {\n    addCategory(input: CategoryInput!): Category!\n  }\n"], ["\n  type Category {\n    name: String\n    id: ID!\n    profile: [Profile]\n  }\n\n  input CategoryInput {\n    name: String!\n  }\n\n  extend type Query {\n    categories: [Category]!\n  }\n\n  extend type Mutation {\n    addCategory(input: CategoryInput!): Category!\n  }\n"])));
exports.default = categoryType;
var templateObject_1;
