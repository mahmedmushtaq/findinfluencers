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
exports.Escrow = exports.EscrowStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils/utils");
var EscrowStatus;
(function (EscrowStatus) {
    EscrowStatus["company_holds"] = "company_holds";
    EscrowStatus["company_holds_for_five_days"] = "company_holds_for_five_days";
    EscrowStatus["dispute"] = "dispute";
    EscrowStatus["paid"] = "paid";
})(EscrowStatus = exports.EscrowStatus || (exports.EscrowStatus = {}));
var escrowSchema = new mongoose_1.default.Schema({
    orderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },
    status: {
        type: String,
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
escrowSchema.statics.build = function (attrs) {
    return new Escrow(attrs);
};
var Escrow = mongoose_1.default.model("escrow", escrowSchema);
exports.Escrow = Escrow;
