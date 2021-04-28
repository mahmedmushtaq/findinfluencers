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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlatformInfo = exports.updateProfileImages = exports.updateInputProfileInfo = void 0;
var models_1 = require("../../../models");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../../../utils");
var util_1 = __importDefault(require("util"));
var fileAccess = util_1.default.promisify(fs_1.default.access);
var fileUnlink = util_1.default.promisify(fs_1.default.unlink);
var updateInputProfileInfo = function (input, context) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, profilePlatformIdsMap, platformProfileIds, categoryIds, description;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Profile.findOne({ userId: context.user.id })];
            case 1:
                profile = _a.sent();
                if (!profile)
                    return [2 /*return*/];
                profilePlatformIdsMap = input.platforms.map(function (_a) {
                    var platformId = _a.platformId, id = _a.id, profileName = _a.profileName, profileUrl = _a.profileUrl, profileFollowers = _a.profileFollowers, rate = _a.rate;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var platformProfile;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, models_1.PlatformProfile.findOne({
                                        _id: id,
                                        userId: context.user.id,
                                    })];
                                case 1:
                                    platformProfile = _b.sent();
                                    if (platformProfile &&
                                        platformProfile.profileName === profileName &&
                                        platformProfile.profileUrl === profileUrl &&
                                        platformProfile.profileFollowers === profileFollowers &&
                                        platformProfile.rate === rate)
                                        return [2 /*return*/, platformProfile];
                                    if (!!platformProfile) return [3 /*break*/, 3];
                                    // create new one
                                    platformProfile = models_1.PlatformProfile.build({
                                        platformId: platformId,
                                        profileName: profileName,
                                        profileFollowers: profileFollowers,
                                        profileUrl: profileUrl,
                                        userId: context.user.id,
                                        rate: rate,
                                    });
                                    return [4 /*yield*/, platformProfile.save()];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/, platformProfile];
                                case 3:
                                    platformProfile.profileName = profileName;
                                    platformProfile.profileUrl = profileUrl;
                                    platformProfile.profileFollowers = profileFollowers;
                                    platformProfile.rate = rate;
                                    return [4 /*yield*/, platformProfile.save()];
                                case 4:
                                    _b.sent();
                                    return [2 /*return*/, platformProfile];
                            }
                        });
                    });
                });
                return [4 /*yield*/, Promise.all(profilePlatformIdsMap)];
            case 2:
                platformProfileIds = _a.sent();
                categoryIds = input.categoryIds, description = input.description;
                if (categoryIds && categoryIds.length >= 1) {
                    profile.categoryIds = categoryIds;
                }
                console.log("description is  ", description);
                profile.description = description;
                profile.platformProfileIds = platformProfileIds;
                return [4 /*yield*/, profile.save()];
            case 3:
                _a.sent();
                // }
                return [2 /*return*/, profile];
        }
    });
}); };
exports.updateInputProfileInfo = updateInputProfileInfo;
var updateProfileImages = function (images, context) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, allImages, imagesPathMap, imagesUrls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Profile.findOne({ userId: context.user.id })];
            case 1:
                profile = _a.sent();
                if (!profile)
                    return [2 /*return*/];
                //delete the old images first
                profile.images.map(function (singleImage) { return __awaiter(void 0, void 0, void 0, function () {
                    var imageName, accessFile, unlinkFile, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                imageName = path_1.default.basename(singleImage);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, fileAccess("src/public/images/profilePlatformPics/" + imageName)];
                            case 2:
                                accessFile = _a.sent();
                                return [4 /*yield*/, fileUnlink("src/public/images/profilePlatformPics/" + imageName)];
                            case 3:
                                unlinkFile = _a.sent();
                                return [2 /*return*/, unlinkFile];
                            case 4:
                                err_1 = _a.sent();
                                return [2 /*return*/];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(images[0])];
            case 2:
                allImages = _a.sent();
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
            case 3:
                imagesUrls = _a.sent();
                console.log("images url ", imagesUrls);
                profile.images = imagesUrls;
                return [4 /*yield*/, profile.save()];
            case 4:
                _a.sent();
                return [2 /*return*/, profile];
        }
    });
}); };
exports.updateProfileImages = updateProfileImages;
// delete PlatformProfile
var deletePlatformInfo = function (id, context) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, remainingPlatforms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Profile.findOne({ userId: context.user.id })];
            case 1:
                profile = _a.sent();
                remainingPlatforms = profile.platformProfileIds.filter(function (singleId) { return singleId.toString() !== id; });
                if ((remainingPlatforms === null || remainingPlatforms === void 0 ? void 0 : remainingPlatforms.length) === 0) {
                    // at least one platform profile must be present
                    return [2 /*return*/, profile];
                }
                profile.platformProfileIds = remainingPlatforms;
                return [4 /*yield*/, (profile === null || profile === void 0 ? void 0 : profile.save())];
            case 2:
                _a.sent();
                // await PlatformProfile.findByIdAndDelete(id);
                return [2 /*return*/, profile];
        }
    });
}); };
exports.deletePlatformInfo = deletePlatformInfo;
