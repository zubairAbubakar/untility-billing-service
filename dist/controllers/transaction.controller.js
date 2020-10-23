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
exports.updateTransaction = exports.airtimePurchase = exports.getTransactions = exports.getTransaction = void 0;
var typeorm_1 = require("typeorm");
var Transaction_1 = require("../entity/Transaction");
var atlabs = require("innovation-sandbox").atlabs;
var baseUrl = 'sandboxapi.fsi.ng';
var sandboxKey = 'db8479fe88c81b95dd65dc37229f82ea';
var contentType = 'application/json';
/**
 * Get a particular Transaction details
 * @param req
 * @param res
 */
exports.getTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Transaction_1.Transaction).findOne(req.params.id)];
            case 1:
                transaction = _a.sent();
                return [2 /*return*/, res.json(transaction)];
        }
    });
}); };
/**
 * Get all transactions
 * @param req
 * @param res
 */
exports.getTransactions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Transaction_1.Transaction).find()];
            case 1:
                transactions = _a.sent();
                return [2 /*return*/, res.json(transactions)];
        }
    });
}); };
/**
 * Save a transaction
 * @param req
 * @param res
 */
exports.airtimePurchase = function (req, res) {
    console.log(req.body.transactionType);
    if (req.body.transactionType == 'AIRTIME_PURCHASE') {
        var serviceUrl = '/atlabs/airtime/send';
        atlabs.Airtime.SendAirtime({
            sandbox_key: sandboxKey,
            payload: {
                recipients: [
                    { phoneNumber: req.body.recipientPhoneNumber, amount: +req.body.amount, currencyCode: "NGN" }
                ]
            }
        }).then(function (sandoxResponse) {
            if (sandoxResponse.responses.length > 0) {
                console.log(sandoxResponse.responses);
                var transactionRepo = typeorm_1.getRepository(Transaction_1.Transaction);
                var newTransaction = new Transaction_1.Transaction();
                newTransaction.amount = req.body.amount;
                newTransaction.requestId = sandoxResponse.responses[0].requestId;
                newTransaction.userId = req.body.userId;
                newTransaction.transactionType = req.body.transactionType;
                newTransaction.recipientPhoneNumber = req.body.recipientPhoneNumber;
                newTransaction.status = sandoxResponse.responses[0].status;
                transactionRepo.save(newTransaction).catch(function (err) { return console.log(err); });
            }
            return res.status(200).json(sandoxResponse);
        });
    }
};
/**
 * Update a transaction
 * @param req
 * @param res
 */
exports.updateTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transaction, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Transaction_1.Transaction).findOne(req.params.id)];
            case 1:
                transaction = _a.sent();
                if (!transaction) return [3 /*break*/, 3];
                typeorm_1.getRepository(Transaction_1.Transaction).merge(transaction, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Transaction_1.Transaction).save(transaction)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.status(404).json({ message: 'Transaction not found' })];
        }
    });
}); };
