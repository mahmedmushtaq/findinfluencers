"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var notificationType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Notification {\n    id: ID!\n    fromUser: User!\n    toUser: User!\n    message: String!\n    read: Boolean!\n    createdAt: String!\n    link: String!\n  }\n\n  extend type Query {\n    allNotifications: [Notification]!\n  }\n\n  extend type Mutation {\n    notificationOpened(id: String): Notification\n  }\n"], ["\n  type Notification {\n    id: ID!\n    fromUser: User!\n    toUser: User!\n    message: String!\n    read: Boolean!\n    createdAt: String!\n    link: String!\n  }\n\n  extend type Query {\n    allNotifications: [Notification]!\n  }\n\n  extend type Mutation {\n    notificationOpened(id: String): Notification\n  }\n"])));
exports.default = notificationType;
var templateObject_1;
