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
exports.addProfileInfoController = void 0;
var models_1 = require("../../../models");
var utils_1 = require("../../../utils");
var addProfileInfoController = function (input, images, context) { return __awaiter(void 0, void 0, void 0, function () {
    var allImages, isProfilePresent, platformProfileIdsMap, platformProfileIds, imagesPathMap, imagesUrls, categoryIds, description, profile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(images[0])];
            case 1:
                allImages = _a.sent();
                return [4 /*yield*/, models_1.Profile.findOne({ userId: context.user.id })];
            case 2:
                isProfilePresent = _a.sent();
                if (isProfilePresent)
                    return [2 /*return*/, isProfilePresent];
                platformProfileIdsMap = input.platforms.map(function (_a) {
                    var platformId = _a.platformId, profileName = _a.profileName, profileUrl = _a.profileUrl, profileFollowers = _a.profileFollowers, rate = _a.rate;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var profilePlatform;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, models_1.PlatformProfile.build({
                                        userId: context.user.id,
                                        platformId: platformId,
                                        profileName: profileName,
                                        profileUrl: profileUrl,
                                        profileFollowers: profileFollowers,
                                        rate: rate,
                                    })];
                                case 1:
                                    profilePlatform = _b.sent();
                                    return [4 /*yield*/, profilePlatform.save()];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/, profilePlatform.id];
                            }
                        });
                    });
                });
                return [4 /*yield*/, Promise.all(platformProfileIdsMap)];
            case 3:
                platformProfileIds = _a.sent();
                imagesPathMap = allImages.map(function (singleImage) { return __awaiter(void 0, void 0, void 0, function () {
                    var fileData, dbPath;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, utils_1.saveFile("images/profilePlatformPics/", singleImage)];
                            case 1:
                                fileData = _a.sent();
                                dbPath = "/public/images/profilePlatformPics/" + fileData.filename;
                                return [2 /*return*/, dbPath];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(imagesPathMap)];
            case 4:
                imagesUrls = _a.sent();
                categoryIds = input.categoryIds, description = input.description;
                return [4 /*yield*/, models_1.Profile.build({
                        categoryIds: categoryIds,
                        platformProfileIds: platformProfileIds,
                        userId: context.user.id,
                        images: imagesUrls,
                        description: description,
                    })];
            case 5:
                profile = _a.sent();
                return [4 /*yield*/, profile.save()];
            case 6:
                _a.sent();
                return [2 /*return*/, profile];
        }
    });
}); };
exports.addProfileInfoController = addProfileInfoController;
