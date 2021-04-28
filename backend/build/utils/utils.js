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
exports.currentDateDifference = exports.getMessageServerUrl = exports.saveFile = exports.generateImageUniqueName = exports.transformMongooseResponse = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.transformMongooseResponse = {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    },
};
var generateImageUniqueName = function (filename) {
    //@ts-ignore
    var strings = filename.split(".");
    var newStringName = strings[0] + Date.now() + "." + strings[strings.length - 1];
    return newStringName;
};
exports.generateImageUniqueName = generateImageUniqueName;
var saveFile = function (publicPath, file) { return __awaiter(void 0, void 0, void 0, function () {
    var singleFile, createReadStream, filename, mimetype, fileStream, fileName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file];
            case 1:
                singleFile = _a.sent();
                createReadStream = singleFile.createReadStream, filename = singleFile.filename, mimetype = singleFile.mimetype;
                fileStream = createReadStream();
                fileName = exports.generateImageUniqueName(filename);
                // save file to  ../../assets/platformPic/${fileName}
                fileStream.pipe(fs_1.default.createWriteStream(path_1.default.join(path_1.default.resolve(__dirname + ("/../public/" + publicPath)), "" + fileName)));
                //@ts-ignore
                singleFile.filename = fileName;
                return [2 /*return*/, singleFile];
        }
    });
}); };
exports.saveFile = saveFile;
var getMessageServerUrl = function (req) {
    return (process.env.MESSAGES_SERVER_URL + req.originalUrl.replace(req.baseUrl, ""));
};
exports.getMessageServerUrl = getMessageServerUrl;
var currentDateDifference = function (date1) {
    //@ts-ignore
    var date = new Date() - date1;
    return date;
};
exports.currentDateDifference = currentDateDifference;
