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
var platform_1 = require("../../models/platform");
var user_1 = require("../../models/user");
var utils_1 = require("../../utils/utils");
var platformResolver = {
    Query: {
        platforms: function () { return __awaiter(void 0, void 0, void 0, function () {
            var platforms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform_1.Platform.find({})];
                    case 1:
                        platforms = _a.sent();
                        return [2 /*return*/, platforms];
                }
            });
        }); },
        platform: function (_, _a) {
            var name = _a.name;
            return __awaiter(void 0, void 0, void 0, function () {
                var platform;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, platform_1.Platform.findOne({ name: name })];
                        case 1:
                            platform = _b.sent();
                            return [2 /*return*/, platform];
                    }
                });
            });
        },
    },
    Mutation: {
        addPlatform: auth_1.authenticated(auth_1.authorized(user_1.UserRole.admin, function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var name, icon, platform;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            name = input.name, icon = input.icon;
                            return [4 /*yield*/, platform_1.Platform.findOne({ name: name })];
                        case 1:
                            platform = _b.sent();
                            if (platform)
                                return [2 /*return*/, platform];
                            platform = platform_1.Platform.build({ name: name.toLowerCase(), icon: icon });
                            return [4 /*yield*/, platform.save()];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, platform];
                    }
                });
            });
        })),
        addPlatformWithIcon: auth_1.authenticated(auth_1.authorized(user_1.UserRole.admin, function (_, _a) {
            var input = _a.input, file = _a.file;
            return __awaiter(void 0, void 0, void 0, function () {
                var fileData, dbPath, platform;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, utils_1.saveFile("images/platformPics/", file)];
                        case 1:
                            fileData = _b.sent();
                            dbPath = "/public/images/platformPics/" + fileData.filename;
                            platform = platform_1.Platform.build({
                                name: input.name.toLowerCase(),
                                icon: dbPath,
                            });
                            return [4 /*yield*/, platform.save()];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, platform];
                    }
                });
            });
        })),
    },
    Platform: {
        platformProfileInfo: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var id, profilePlatform;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = parent.id;
                            return [4 /*yield*/, models_1.PlatformProfile.find({ platformId: id })];
                        case 1:
                            profilePlatform = _a.sent();
                            return [2 /*return*/, profilePlatform];
                    }
                });
            });
        },
    },
};
exports.default = platformResolver;
