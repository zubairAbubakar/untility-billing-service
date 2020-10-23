"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var transaction_controller_1 = require("../controllers/transaction.controller");
var router = express_1.Router();
//REST API routes
router.get('/api/transactions/:id', transaction_controller_1.getTransaction);
router.get('/api/transactions', transaction_controller_1.getTransactions);
router.post('/api/transactions', transaction_controller_1.createTransaction);
router.put('/api/transactions/:id', transaction_controller_1.updateTransaction);
exports.default = router;
