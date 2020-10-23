"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
//create an instance of express
var app = express_1.default();
typeorm_1.createConnection().catch(function (error) { return console.log(error); });
//create middlewares
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
//create routes
app.use(user_routes_1.default);
app.use(transaction_routes_1.default);
var server = app.listen(9000);
console.log('server on port', 9000);
module.exports = server;
