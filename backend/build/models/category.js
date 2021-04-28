"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var CategorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
}, utils_1.transformMongooseResponse);
CategorySchema.statics.build = function (attrs) {
    return new Category(attrs);
};
var Category = mongoose_1.default.model("category", CategorySchema);
exports.Category = Category;
