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
exports.Order = exports.OrderStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["require_payment"] = "require_payment";
    OrderStatus["needs_approval"] = "needs_approval";
    OrderStatus["working"] = "working";
    OrderStatus["rejected"] = "rejected";
    OrderStatus["submit_for_payment"] = "submit_for_payment";
    OrderStatus["completed"] = "completed";
    OrderStatus["cancelled"] = "cancelled";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var orderSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    platformProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "plaform-profile",
        required: true,
    },
    ownerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    workingUserId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, __assign(__assign({}, utils_1.transformMongooseResponse), { timestamps: true }));
orderSchema.statics.build = function (attrs) {
    return new Order(attrs);
};
var Order = mongoose_1.default.model("order", orderSchema);
exports.Order = Order;
