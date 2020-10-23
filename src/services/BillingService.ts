import { json, Request, response, Response } from 'express'
import { getRepository } from 'typeorm'
import { Transaction } from '../entity/Transaction'
import { User } from '../entity/User'


const { atlabs } = require("innovation-sandbox");
//const axios = require('axios');
const baseUrl = 'sandboxapi.fsi.ng';
const sandboxKey = 'db8479fe88c81b95dd65dc37229f82ea';
const contentType = 'application/json';



export const airtimePurchase = (req: Request, res: Response)=> {
    
    console.log(req.body.transactionType);
    if(req.body.transactionType == 'AIRTIME_PURCHASE'){

      const serviceUrl = '/atlabs/airtime/send';
       atlabs.Airtime.SendAirtime({
            sandbox_key: sandboxKey,
            payload: {
              recipients: [
                { phoneNumber: req.body.recipientPhoneNumber, amount: +req.body.amount, currencyCode: "NGN" }
              ]
            }
          }).then(res2 => {
            //do something
            //console.log(res2);
            if(res2.responses.length > 0) {

              console.log(res2.responses)
              
              const transactionRepo = getRepository(Transaction);
              const newTransaction = new Transaction();
              newTransaction.amount = req.body.amount;
              newTransaction.requestId = res2.responses[0].requestId;
              newTransaction.userId = req.body.userId;
              newTransaction.transactionType = req.body.transactionType;
              newTransaction.recipientPhoneNumber = req.body.recipientPhoneNumber;
              newTransaction.status = res2.responses[0].status;

              transactionRepo.save(newTransaction).catch((err) => console.log(err));
          }

            return res;
          });

        
    }


};