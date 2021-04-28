"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithDrawlRequest = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var withDrawlRequestSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, utils_1.transformMongooseResponse);
withDrawlRequestSchema.statics.build = function (attrs) {
    return new WithDrawlRequest(attrs);
};
var WithDrawlRequest = mongoose_1.default.model("with_drawl_request", withDrawlRequestSchema);
exports.WithDrawlRequest = WithDrawlRequest;
