"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amount = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var amountSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    amount: {
        type: Number,
        required: true,
    },
    billed: {
        type: Number,
        required: true,
    },
}, utils_1.transformMongooseResponse);
amountSchema.statics.build = function (attrs) {
    return new Amount(attrs);
};
var Amount = mongoose_1.default.model("amount", amountSchema);
exports.Amount = Amount;
