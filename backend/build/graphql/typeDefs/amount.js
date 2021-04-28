"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var amountType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Amount {\n    id: ID!\n    userId: User\n    amount: Int\n    billed: Int\n  }\n  extend type Query {\n    amount: String\n  }\n\n  input paymentWithdrawlInput{\n    amount: Int\n  }\n\n  extend type Mutation{\n    paymentWithdrawl(input: paymentWithdrawlInput): Amount\n  }\n"], ["\n  type Amount {\n    id: ID!\n    userId: User\n    amount: Int\n    billed: Int\n  }\n  extend type Query {\n    amount: String\n  }\n\n  input paymentWithdrawlInput{\n    amount: Int\n  }\n\n  extend type Mutation{\n    paymentWithdrawl(input: paymentWithdrawlInput): Amount\n  }\n"])));
exports.default = amountType;
var templateObject_1;
