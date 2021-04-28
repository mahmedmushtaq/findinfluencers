"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = __importDefault(require("./platform"));
var user_1 = __importDefault(require("./user"));
var category_1 = __importDefault(require("./category"));
var profile_1 = __importDefault(require("./profile"));
var settings_1 = __importDefault(require("./settings"));
var order_1 = __importDefault(require("./order"));
var escrow_1 = __importDefault(require("./escrow"));
var amount_1 = __importDefault(require("./amount"));
var notification_1 = __importDefault(require("./notification"));
var withdrawl_1 = __importDefault(require("./withdrawl"));
exports.default = [
    user_1.default,
    platform_1.default,
    category_1.default,
    profile_1.default,
    settings_1.default,
    order_1.default,
    escrow_1.default,
    amount_1.default,
    notification_1.default,
    withdrawl_1.default,
];
