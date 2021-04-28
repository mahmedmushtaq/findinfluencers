"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var settingsType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  input UpdateSettings {\n    updatePassword: String\n    updateEmail: String\n    updateName: String\n    updateUsername: String\n  }\n\n  extend type Mutation {\n    updateUser(input: UpdateSettings!, dp: Upload): User!\n  }\n"], ["\n  input UpdateSettings {\n    updatePassword: String\n    updateEmail: String\n    updateName: String\n    updateUsername: String\n  }\n\n  extend type Mutation {\n    updateUser(input: UpdateSettings!, dp: Upload): User!\n  }\n"])));
exports.default = settingsType;
var templateObject_1;
