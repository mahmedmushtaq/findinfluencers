"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var body_parser_1 = require("body-parser");
var apollo_server_express_1 = require("apollo-server-express");
var graphql_1 = require("./graphql");
var utils_1 = require("./utils");
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
var app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use("/public", express_1.default.static(path_1.default.join(__dirname + "/public")));
app.use(body_parser_1.json());
app.use("/api/messages", routes_1.messagesRouter);
// app.use(cors());
var server = new apollo_server_express_1.ApolloServer({
    typeDefs: graphql_1.typeDefs,
    resolvers: graphql_1.resolvers,
    context: function (_a) {
        var req = _a.req;
        var token = req.headers.authorization || "";
        var user = utils_1.JWT.verifyJwt(token);
        return { user: user };
    },
});
server.applyMiddleware({ app: app, path: "/graphql" });
