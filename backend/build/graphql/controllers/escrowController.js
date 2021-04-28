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
exports.savePaymentIntent = exports.setPaymentIntent = exports.escrowController = void 0;
var models_1 = require("../../models");
var escrow_1 = require("../../models/escrow");
var order_1 = require("../../models/order");
var stripe_1 = require("../../utils/stripe");
var utils_1 = require("../../utils/utils");
var updateAmount = function (escrow) { return __awaiter(void 0, void 0, void 0, function () {
    var ownerAmount, workingUserAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Amount.findOne({
                    userId: escrow.ownerId.id,
                })];
            case 1:
                ownerAmount = _a.sent();
                if (!ownerAmount) {
                    ownerAmount = models_1.Amount.build({
                        userId: escrow.ownerId.id,
                        amount: 0,
                        billed: 0,
                    });
                }
                ownerAmount.amount = ownerAmount.amount + escrow.orderId.amount;
                return [4 /*yield*/, (ownerAmount === null || ownerAmount === void 0 ? void 0 : ownerAmount.save())];
            case 2:
                _a.sent();
                return [4 /*yield*/, models_1.Amount.findOne({
                        //@ts-ignore
                        userId: escrow.workingUserId._id,
                    })];
            case 3:
                workingUserAmount = _a.sent();
                if (!workingUserAmount) {
                    workingUserAmount = models_1.Amount.build({
                        //@ts-ignore
                        userId: escrow.workingUserId._id,
                        amount: 0,
                        billed: 0,
                    });
                }
                workingUserAmount.amount = workingUserAmount.amount + escrow.orderId.amount; //@ts-ignore
                return [4 /*yield*/, (workingUserAmount === null || workingUserAmount === void 0 ? void 0 : workingUserAmount.save())];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var escrowController = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var escrowsDoc, escrowsMap, escrows, amount, billed, userAmount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Escrow.find({
                    $and: [
                        {
                            $or: [{ ownerId: context.user.id }, { workingUserId: context.user.id }],
                        },
                        {
                            $or: [
                                { status: escrow_1.EscrowStatus.company_holds },
                                { status: escrow_1.EscrowStatus.company_holds_for_five_days },
                            ],
                        },
                    ],
                })
                    .populate("ownerId", "id email full_name")
                    .populate("workingUserId", "id email full_name")
                    .populate("orderId")];
            case 1:
                escrowsDoc = _a.sent();
                escrowsMap = escrowsDoc.map(function (escrow) { return __awaiter(void 0, void 0, void 0, function () {
                    var date, fiveDaysMillisecond;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(escrow.status === escrow_1.EscrowStatus.company_holds_for_five_days)) return [3 /*break*/, 3];
                                date = utils_1.currentDateDifference(escrow.updatedAt) / 1000;
                                fiveDaysMillisecond = 5 * 24 * 60 * 60;
                                if (date <= fiveDaysMillisecond)
                                    return [2 /*return*/, escrow];
                                // const update Escrow status
                                return [4 /*yield*/, updateAmount(escrow)];
                            case 1:
                                // const update Escrow status
                                _a.sent();
                                escrow.status = escrow_1.EscrowStatus.paid;
                                return [4 /*yield*/, escrow.save()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/, escrow];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(escrowsMap)];
            case 2:
                escrows = _a.sent();
                amount = 0, billed = 0;
                console.log(escrows);
                return [4 /*yield*/, models_1.Amount.findOne({ userId: context.user.id })];
            case 3:
                userAmount = _a.sent();
                if (userAmount) {
                    amount = userAmount.amount;
                    billed = userAmount.billed;
                }
                console.log("escrows ", escrows);
                return [2 /*return*/, {
                        escrows: escrows,
                        amount: amount,
                        billed: billed,
                    }];
        }
    });
}); };
exports.escrowController = escrowController;
var setPaymentIntent = function (context, order) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, user, description, stripe_customer, e_1, paymentMethods, isPaymentMethodPresent, paymentIntent, paymentIsAlreadyDone, client_secret, id, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                amount = order.amount * 100;
                return [4 /*yield*/, models_1.User.findById(context.user.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, user];
                if (!!user.stripe_customer) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                description = "User " + context.user.email + " add amount in escrow";
                return [4 /*yield*/, stripe_1.stripe.customers.create({
                        description: description,
                    })];
            case 3:
                stripe_customer = (_a.sent()).id;
                user.stripe_customer = stripe_customer;
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                console.log("new stripe customer is created successfully");
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                console.log("error on creating stripe customer");
                throw e_1;
            case 6: return [4 /*yield*/, stripe_1.stripe.paymentMethods.list({
                    customer: user.stripe_customer,
                    type: "card",
                })];
            case 7:
                paymentMethods = _a.sent();
                isPaymentMethodPresent = !!paymentMethods.data[0];
                return [4 /*yield*/, stripe_1.createPaymentIntent({
                        amount: amount,
                        customer: user.stripe_customer,
                        // if users is already saved their card then charge them
                        payment_method_id: isPaymentMethodPresent
                            ? paymentMethods.data[0].id
                            : undefined,
                        confirm: !!isPaymentMethodPresent,
                    })];
            case 8:
                paymentIntent = _a.sent();
                paymentIsAlreadyDone = false;
                if (!isPaymentMethodPresent) return [3 /*break*/, 10];
                // if payment Method is Present then it is mean that payment is already done and received
                paymentIsAlreadyDone = true;
                order.status = order_1.OrderStatus.needs_approval;
                return [4 /*yield*/, order.save()];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                client_secret = paymentIntent.client_secret, id = paymentIntent.id;
                if (id && client_secret) {
                    return [2 /*return*/, {
                            client_secret: client_secret,
                            id: id,
                            paymentIsAlreadyDone: paymentIsAlreadyDone,
                        }];
                }
                return [3 /*break*/, 12];
            case 11:
                err_1 = _a.sent();
                throw err_1;
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.setPaymentIntent = setPaymentIntent;
var savePaymentIntent = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var orderId, stripe_payment_intent_id, paymentIntent, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderId = input.orderId, stripe_payment_intent_id = input.stripe_payment_intent_id;
                console.log(" ======= save payment intent ========== ", input);
                return [4 /*yield*/, stripe_1.stripe.paymentIntents.retrieve(stripe_payment_intent_id)];
            case 1:
                paymentIntent = _a.sent();
                return [4 /*yield*/, models_1.Order.findById(orderId)];
            case 2:
                order = _a.sent();
                order.status = order_1.OrderStatus.needs_approval;
                order.amount = paymentIntent.amount / 100; //
                return [4 /*yield*/, (order === null || order === void 0 ? void 0 : order.save())];
            case 3:
                _a.sent();
                return [2 /*return*/, order];
        }
    });
}); };
exports.savePaymentIntent = savePaymentIntent;
