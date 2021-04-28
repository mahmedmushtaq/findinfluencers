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
var utils_1 = require("../../utils");
var auth_1 = require("../../middlewares/auth");
var models_1 = require("../../models");
var messagesEvent_1 = require("../../events/messagesEvent");
var settingsResolver = {
    Mutation: {
        updateUser: auth_1.authenticated(function (_, _a, context) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var updateName, updateEmail, updatePassword, updateUsername, user, updateAnyField, isEmailPresent, isUsernameIsAlreadyPresent, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            updateName = input.updateName, updateEmail = input.updateEmail, updatePassword = input.updatePassword, updateUsername = input.updateUsername;
                            return [4 /*yield*/, models_1.User.findById(context.user.id)];
                        case 1:
                            user = _b.sent();
                            if (!user)
                                return [2 /*return*/];
                            if (updatePassword) {
                                user.password = updatePassword;
                                updateAnyField = true;
                            }
                            if (!(updateEmail && user.email !== updateEmail)) return [3 /*break*/, 3];
                            return [4 /*yield*/, models_1.User.findOne({
                                    email: updateEmail,
                                    _id: { $ne: context.user.id },
                                })];
                        case 2:
                            isEmailPresent = _b.sent();
                            if (isEmailPresent) {
                                throw new apollo_server_express_1.ApolloError("Email is already in Use");
                            }
                            user.email = updateEmail;
                            updateAnyField = true;
                            _b.label = 3;
                        case 3:
                            // updateName Only if it is different from current name
                            if (updateName && user.full_name !== updateName) {
                                user.full_name = updateName;
                                updateAnyField = true;
                            }
                            if (!(updateUsername && user.username !== updateUsername)) return [3 /*break*/, 5];
                            return [4 /*yield*/, models_1.User.findOne({
                                    username: updateUsername,
                                    _id: { $ne: context.user.id },
                                })];
                        case 4:
                            isUsernameIsAlreadyPresent = _b.sent();
                            if (isUsernameIsAlreadyPresent) {
                                throw new apollo_server_express_1.ApolloError("username is already in use");
                            }
                            user.username = updateUsername;
                            updateAnyField = true;
                            _b.label = 5;
                        case 5:
                            console.log("updateUsername = ", updateUsername);
                            if (!updateAnyField)
                                return [2 /*return*/, user];
                            return [4 /*yield*/, user.save()];
                        case 6:
                            _b.sent();
                            // send update event
                            if (!updatePassword)
                                messagesEvent_1.updateUserEvent(context.user.token, {
                                    firstName: user.full_name,
                                    email: user.email,
                                });
                            else
                                messagesEvent_1.updateUserEvent(context.user.token, {
                                    firstName: user.full_name,
                                    email: user.email,
                                    password: updatePassword,
                                });
                            return [4 /*yield*/, utils_1.JWT.generateJWt({
                                    id: user.id,
                                    email: user.email,
                                    role: user.role,
                                })];
                        case 7:
                            token = _b.sent();
                            return [2 /*return*/, {
                                    role: user.role,
                                    id: user.id,
                                    email: user.email,
                                    full_name: user.full_name,
                                    token: token,
                                }];
                    }
                });
            });
        }),
    },
};
exports.default = settingsResolver;
