"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var userType_1 = __importDefault(require("./userType"));
var platformType_1 = __importDefault(require("./platformType"));
var categoryType_1 = __importDefault(require("./categoryType"));
var profileType_1 = __importDefault(require("./profileType"));
var settings_1 = __importDefault(require("./settings"));
var order_1 = __importDefault(require("./order"));
var escrow_1 = __importDefault(require("./escrow"));
var amount_1 = __importDefault(require("./amount"));
var notification_1 = __importDefault(require("./notification"));
var withdrawl_1 = __importDefault(require("./withdrawl"));
var rootType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    AuthenticationError: String\n  }\n  type Mutation {\n    rootType: String\n  }\n"], ["\n  type Query {\n    AuthenticationError: String\n  }\n  type Mutation {\n    rootType: String\n  }\n"])));
exports.default = [
    rootType,
    userType_1.default,
    platformType_1.default,
    categoryType_1.default,
    profileType_1.default,
    settings_1.default,
    order_1.default,
    escrow_1.default,
    amount_1.default,
    notification_1.default,
    withdrawl_1.default,
];
var templateObject_1;
