"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var platformType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Platform {\n    name: String\n    id: ID!\n    icon: String\n    platformProfileInfo: [PlatformProfileInfo]\n  }\n\n  input PlatformInput {\n    name: String!\n    icon: String\n  }\n\n  extend type Query {\n    platforms: [Platform]!\n    platform(name: String!): Platform!\n  }\n\n  extend type Mutation {\n    addPlatform(input: PlatformInput!): Platform\n    addPlatformWithIcon(input: PlatformInput!, file: Upload!): Platform\n  }\n"], ["\n  type Platform {\n    name: String\n    id: ID!\n    icon: String\n    platformProfileInfo: [PlatformProfileInfo]\n  }\n\n  input PlatformInput {\n    name: String!\n    icon: String\n  }\n\n  extend type Query {\n    platforms: [Platform]!\n    platform(name: String!): Platform!\n  }\n\n  extend type Mutation {\n    addPlatform(input: PlatformInput!): Platform\n    addPlatformWithIcon(input: PlatformInput!, file: Upload!): Platform\n  }\n"])));
exports.default = platformType;
var templateObject_1;
