"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var withDrawlRequestType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type WithDrawlRequest {\n    id: ID  \n    user: User\n    amount: Int\n    status: String\n  }\n  extend type Query {\n    allWithDrawlRequest: [WithDrawlRequest!]!\n  }\n  extend type Mutation {\n    approved(id: String): WithDrawlRequest\n  }\n"], ["\n  type WithDrawlRequest {\n    id: ID  \n    user: User\n    amount: Int\n    status: String\n  }\n  extend type Query {\n    allWithDrawlRequest: [WithDrawlRequest!]!\n  }\n  extend type Mutation {\n    approved(id: String): WithDrawlRequest\n  }\n"])));
exports.default = withDrawlRequestType;
var templateObject_1;
