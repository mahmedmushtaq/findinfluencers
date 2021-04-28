"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var PlatformSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});
PlatformSchema.statics.build = function (attrs) {
    return new Platform(attrs);
};
var Platform = mongoose_1.default.model("platform", PlatformSchema);
exports.Platform = Platform;
