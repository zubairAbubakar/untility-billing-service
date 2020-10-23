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
                done();
            });
        });
    });
    /**
     * Test the Airtime Purchase endpoint
     */
});
