"use strict";
var chaitest = require("chai");
var chaihttp = require("chai-http");
var server = require("../index");
//Set Assertion style 
chaitest.should();
chaitest.use(chaihttp);
describe('Utility Billing Service API', function () {
    /**
     * Test fetching of all transactions
     */
    describe('Get /api/transactions', function () {
        it("it should get all transactions", function (done) {
            chaitest.request(server)
                .get("/api/transactions")
                .end(function (err, response) {
                response.should.have.status(200);
                response.body.length.should.be.above(0);
                response.body[0].should.have.property('id');
                done();
            });
        });
        it("it should not get all transactions, if wrong uri is provided", function (done) {
            chaitest.request(server)
                .get("/api/transaction")
                .end(function (err, response) {
                response.should.have.status(404);
                done();
            });
        });
    });
    /**
     * Test the Airtime Purchase endpoint
     */
    describe('POST /api/airtimePurchase', function () {
        it("it should test the airtime purchase", function (done) {
            var transaction = {
                amount: "426",
                status: "",
                requestId: "000123431wdddsdwwwr32wezxsssss",
                transactionType: "AIRTIME_PURCHASE",
                recipientPhoneNumber: "+2347033568047",
                userId: 1
            };
            chaitest.request(server)
                .post("/api/airtimePurchase")
                .send(transaction)
                .end(function (err, response) {
                response.should.have.status(200);
                response.body.should.have.property('responses');
                done();
            });
        });
    });
});
