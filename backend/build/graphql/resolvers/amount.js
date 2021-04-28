"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var auth_1 = require("../../middlewares/auth");
var models_1 = require("../../models");
var user_1 = require("../../models/user");
var AmountResolver = {
    Query: {},
    Mutation: {
        paymentWithdrawl: auth_1.authenticated(auth_1.authorized(user_1.UserRole.influencer, function (_, _a, context) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var amount, amountDoc, isWithDrawlRequestIsPresent;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            amount = input.amount;
                            return [4 /*yield*/, models_1.Amount.findOne({ userId: context.user.id })];
                        case 1:
                            amountDoc = _b.sent();
                            if (!amountDoc) {
                                throw new apollo_server_express_1.ApolloError("No amount is present. Contact to support team for this issue");
                            }
                            if (amount > amountDoc.amount) {
                                throw new apollo_server_express_1.ApolloError("Not enough balance. Contact to support team for this issue");
                            }
                            return [4 /*yield*/, models_1.WithDrawlRequest.findOne({
                                    userId: context.user.id,
                                })];
                        case 2:
                            isWithDrawlRequestIsPresent = _b.sent();
                            if (isWithDrawlRequestIsPresent) {
                                throw new apollo_server_express_1.ApolloError("Please wait unitll your previous payment will not released");
                            }
                            amountDoc.amount = amountDoc.amount - amount;
                            amountDoc.billed = amountDoc.billed + amount;
                            return [4 /*yield*/, amountDoc.save()];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, models_1.WithDrawlRequest.build({
                                    userId: context.user.id,
                                    status: "pending",
                                    amount: amount,
                                }).save()];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, amountDoc];
                    }
                });
            });
        })),
    },
};
exports.default = AmountResolver;
