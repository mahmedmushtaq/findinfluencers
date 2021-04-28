"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformProfile = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var profilePlatformSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    platformId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Platform",
        required: true,
    },
    profileName: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        required: true,
    },
    profileFollowers: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
}, utils_1.transformMongooseResponse);
profilePlatformSchema.statics.build = function (attrs) {
    return new PlatformProfile(attrs);
};
var PlatformProfile = mongoose_1.default.model("plaform-profile", profilePlatformSchema);
exports.PlatformProfile = PlatformProfile;
