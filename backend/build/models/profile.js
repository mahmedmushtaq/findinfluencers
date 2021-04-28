"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var profileSchema = new mongoose_1.default.Schema({
    categoryIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: "category",
        },
    ],
    platformProfileIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "profile-plaform",
            required: true,
        },
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
}, utils_1.transformMongooseResponse);
profileSchema.statics.build = function (attrs) {
    return new Profile(attrs);
};
var Profile = mongoose_1.default.model("profile", profileSchema);
exports.Profile = Profile;
