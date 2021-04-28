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
var auth_1 = require("../../middlewares/auth");
var models_1 = require("../../models");
var order_1 = require("../../models/order");
var user_1 = require("../../models/user");
var orderStatusControllerBuyer_1 = require("../controllers/orderController/orderStatusControllerBuyer");
var notification_1 = require("../controllers/notification");
var OrderResolver = {
    Query: {
        myPendingOrders: auth_1.authenticated(auth_1.authorized(user_1.UserRole.influencer, function (_, _a, context) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var orders;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models_1.Order.find({
                                workingUserId: context.user.id,
                                status: order_1.OrderStatus.needs_approval,
                            })
                                .populate("ownerId", "-password -__v")
                                .populate("workingUserId", "-password -__v")
                                .populate("platformProfileId")
                                .sort([["createdAt", -1]])];
                        case 1:
                            orders = _b.sent();
                            return [2 /*return*/, orders];
                    }
                });
            });
        })),
        orderInformation: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var orderId, order;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            orderId = input.orderId;
                            return [4 /*yield*/, models_1.Order.findById(orderId)
                                    .populate("ownerId", "-password -__v")
                                    .populate("workingUserId", "-password -__v")
                                    .populate("platformProfileId")];
                        case 1:
                            order = _b.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        },
        orderByStatus: auth_1.authenticated(function (_, _a, context) {
            var status = _a.status;
            return __awaiter(void 0, void 0, void 0, function () {
                var orders;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, models_1.Order.find({
                                $or: [
                                    { workingUserId: context.user.id },
                                    { ownerId: context.user.id },
                                ],
                                status: status,
                            })
                                .populate("ownerId", "-password -__v")
                                .populate("workingUserId", "-password -__v")
                                .populate("platformProfileId")
                                .sort([["createdAt", -1]])];
                        case 1:
                            orders = _b.sent();
                            return [2 /*return*/, orders];
                    }
                });
            });
        }),
    },
    Mutation: {
        createOffer: auth_1.authenticated(auth_1.authorized(user_1.UserRole.buyer, function (_, _a, context) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var name, status, description, amount, platformProfileId, workingUserId, order;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            name = input.name, status = input.status, description = input.description, amount = input.amount, platformProfileId = input.platformProfileId, workingUserId = input.workingUserId;
                            order = models_1.Order.build({
                                name: name,
                                status: order_1.OrderStatus.require_payment,
                                description: description,
                                ownerId: context.user.id,
                                workingUserId: workingUserId,
                                amount: amount,
                                platformProfileId: platformProfileId,
                            });
                            return [4 /*yield*/, order.save()];
                        case 1:
                            _b.sent();
                            // const stripeRes = await stripe.charges.create({
                            //   amount: order.amount * 100,
                            //   currency: "usd",
                            //   source: stripeToken,
                            //   description: `You have successfully added ${
                            //     order.amount * 100
                            //   } in escrow. `,
                            //   // metadata: {
                            //   //   key: value, // any meta-data you want to store
                            //   // },
                            // });
                            // console.log("stripe res is = ", stripeRes);
                            return [4 /*yield*/, notification_1.sendNotification(context.user.id, workingUserId, "New Order Has Been Received", "orders/" + order.id)];
                        case 2:
                            // const stripeRes = await stripe.charges.create({
                            //   amount: order.amount * 100,
                            //   currency: "usd",
                            //   source: stripeToken,
                            //   description: `You have successfully added ${
                            //     order.amount * 100
                            //   } in escrow. `,
                            //   // metadata: {
                            //   //   key: value, // any meta-data you want to store
                            //   // },
                            // });
                            // console.log("stripe res is = ", stripeRes);
                            _b.sent();
                            return [2 /*return*/, order];
                    }
                });
            });
        })),
        setOfferStatus: auth_1.authenticated(function (_, _a, context) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var order;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(context.user.role === "influencer")) return [3 /*break*/, 2];
                            return [4 /*yield*/, orderStatusControllerBuyer_1.orderStatusControllerInfluencer(input, context)];
                        case 1:
                            order = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, orderStatusControllerBuyer_1.orderStatusControllerBuyer(input, context)];
                        case 3:
                            order = _b.sent();
                            _b.label = 4;
                        case 4: return [2 /*return*/, order];
                    }
                });
            });
        }),
    },
    Order: {
        owner: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, parent.ownerId];
            });
        }); },
        workingUser: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, parent.workingUserId];
            });
        }); },
        platformProfile: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, parent.platformProfileId];
            });
        }); },
        escrow: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var escrow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Escrow.findOne({ orderId: parent.id })];
                    case 1:
                        escrow = _a.sent();
                        return [2 /*return*/, escrow];
                }
            });
        }); },
    },
};
exports.default = OrderResolver;
