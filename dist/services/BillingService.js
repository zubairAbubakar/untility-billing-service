"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airtimePurchase = void 0;
var typeorm_1 = require("typeorm");
var Transaction_1 = require("../entity/Transaction");
var atlabs = require("innovation-sandbox").atlabs;
//const axios = require('axios');
var baseUrl = 'sandboxapi.fsi.ng';
var sandboxKey = 'db8479fe88c81b95dd65dc37229f82ea';
var contentType = 'application/json';
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
        }).then(function (res2) {
            //do something
            //console.log(res2);
            if (res2.responses.length > 0) {
                console.log(res2.responses);
                var transactionRepo = typeorm_1.getRepository(Transaction_1.Transaction);
                var newTransaction = new Transaction_1.Transaction();
                newTransaction.amount = req.body.amount;
                newTransaction.requestId = res2.responses[0].requestId;
                newTransaction.userId = req.body.userId;
                newTransaction.transactionType = req.body.transactionType;
                newTransaction.recipientPhoneNumber = req.body.recipientPhoneNumber;
                newTransaction.status = res2.responses[0].status;
                transactionRepo.save(newTransaction).catch(function (err) { return console.log(err); });
            }
            return res;
        });
    }
};
