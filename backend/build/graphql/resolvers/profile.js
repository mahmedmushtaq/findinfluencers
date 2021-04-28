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
var profileController_1 = require("../controllers/profileController/profileController");
var profileSearchController_1 = require("../controllers/profileController/profileSearchController");
var updateProfileController_1 = require("../controllers/profileController/updateProfileController");
var profileResolver = {
    Query: {
        myProfile: auth_1.authenticated(function (_, _1, context) { return __awaiter(void 0, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Profile.findOne({ userId: context.user.id })];
                    case 1:
                        profile = _a.sent();
                        // .populate("userId", "-password -v")
                        // .populate("categoryIds")
                        // .populate("profilePlatformIds");
                        return [2 /*return*/, profile];
                }
            });
        }); }),
        profileRates: function () { return __awaiter(void 0, void 0, void 0, function () {
            var rateRangePlatformProfile, max, min;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.PlatformProfile.aggregate([
                            {
                                $group: {
                                    _id: null,
                                    max: { $max: "$rate" },
                                    min: { $min: "$rate" },
                                },
                            },
                        ])];
                    case 1:
                        rateRangePlatformProfile = _a.sent();
                        max = rateRangePlatformProfile[0].max;
                        min = rateRangePlatformProfile[0].min;
                        return [2 /*return*/, {
                                rateRange: [min, max],
                            }];
                }
            });
        }); },
        searchProfile: function (_, _a) {
            var input = _a.input, pageNum = _a.pageNum;
            return __awaiter(void 0, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, profileSearchController_1.searchProfileController(input, pageNum)];
                        case 1:
                            profile = _b.sent();
                            return [2 /*return*/, profile];
                    }
                });
            });
        },
        userProfile: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var username, userId, user, profile;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            username = input.username, userId = input.userId;
                            if (!username) return [3 /*break*/, 2];
                            return [4 /*yield*/, user_1.User.findOne({ username: username })];
                        case 1:
                            user = _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, user_1.User.findById(userId)];
                        case 3:
                            user = _b.sent();
                            _b.label = 4;
                        case 4:
                            if (!user) {
                                throw new apollo_server_express_1.ApolloError("No User Is Found");
                            }
                            return [4 /*yield*/, models_1.Profile.findOne({ userId: user.id })];
                        case 5:
                            profile = _b.sent();
                            return [2 /*return*/, profile];
                    }
                });
            });
        },
    },
    Mutation: {
        addProfileInfo: auth_1.authenticated(auth_1.authorized(user_1.UserRole.influencer, function (_, _a, context) {
            var input = _a.input, images = _a.images;
            return __awaiter(void 0, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, profileController_1.addProfileInfoController(input, images, context)];
                        case 1:
                            profile = _b.sent();
                            return [2 /*return*/, profile];
                    }
                });
            });
        })),
        updateProfileInfo: auth_1.authenticated(function (_, _a, context) {
            var input = _a.input, images = _a.images;
            return __awaiter(void 0, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!images) return [3 /*break*/, 2];
                            return [4 /*yield*/, updateProfileController_1.updateProfileImages(images, context)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            profile = updateProfileController_1.updateInputProfileInfo(input, context);
                            return [2 /*return*/, profile];
                    }
                });
            });
        }),
        deletePlatformProfile: auth_1.authenticated(function (_, _a, context) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, updateProfileController_1.deletePlatformInfo(id, context)];
                        case 1:
                            profile = _b.sent();
                            return [2 /*return*/, profile];
                    }
                });
            });
        }),
    },
    Profile: {
        user: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_1.User.findById(parent.userId)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        }); },
        platformProfileInfo: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var profilePlatformInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.PlatformProfile.find({
                            _id: parent.platformProfileIds,
                        })];
                    case 1:
                        profilePlatformInfo = _a.sent();
                        return [2 /*return*/, profilePlatformInfo];
                }
            });
        }); },
        category: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
            var categoriesInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.Category.find({ _id: parent.categoryIds })];
                    case 1:
                        categoriesInfo = _a.sent();
                        return [2 /*return*/, categoriesInfo];
                }
            });
        }); },
    },
    // field level resolver
    PlatformProfileInfo: {
        platform: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var platformId, platform;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            platformId = parent.platformId;
                            return [4 /*yield*/, models_1.Platform.findById(platformId)];
                        case 1:
                            platform = _a.sent();
                            return [2 /*return*/, platform];
                    }
                });
            });
        },
        user: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = parent.userId;
                            return [4 /*yield*/, user_1.User.findById(userId)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        },
    },
};
exports.default = profileResolver;
