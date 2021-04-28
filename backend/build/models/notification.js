"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var notificationSchema = new mongoose_1.default.Schema({
    fromUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    toUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: function () { return false; },
    },
    opened: {
        type: Boolean,
        default: function () { return false; },
    },
}, __assign(__assign({}, utils_1.transformMongooseResponse), { timestamps: { createdAt: true, updatedAt: false } }));
notificationSchema.statics.build = function (attrs) {
    return new Notification(attrs);
};
var Notification = mongoose_1.default.model("notification", notificationSchema);
exports.Notification = Notification;
