import { json, Request, response, Response } from 'express'
import { getRepository } from 'typeorm'
import { Transaction } from '../entity/Transaction'
import { User } from '../entity/User'


const { atlabs } = require("innovation-sandbox");

const baseUrl = 'sandboxapi.fsi.ng';
const sandboxKey = 'db8479fe88c81b95dd65dc37229f82ea';
const contentType = 'application/json';

/**
 * Get a particular Transaction details 
 * @param req 
 * @param res 
 */
export const getTransaction = async (req: Request, res: Response): Promise<Response> => {
    const transaction = await getRepository(Transaction).findOne(req.params.id);
    return res.json(transaction);
};

/**
 * Get all transactions 
 * @param req 
 * @param res 
 */
export const getTransactions = async (req: Request, res: Response): Promise<Response> => {
    const transactions = await getRepository(Transaction).find();
    return res.json(transactions);
};

/**
 * Save a transaction
 * @param req 
 * @param res 
 */
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
          }).then(sandoxResponse => {
            
            if(sandoxResponse.responses.length > 0) {

              console.log(sandoxResponse.responses);
              
              const transactionRepo = getRepository(Transaction);
              const newTransaction = new Transaction();
              newTransaction.amount = req.body.amount;
              newTransaction.requestId = sandoxResponse.responses[0].requestId;
              newTransaction.userId = req.body.userId;
              newTransaction.transactionType = req.body.transactionType;
              newTransaction.recipientPhoneNumber = req.body.recipientPhoneNumber;
              newTransaction.status = sandoxResponse.responses[0].status;

              transactionRepo.save(newTransaction).catch((err) => console.log(err));
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
export const updateTransaction = async (req: Request, res: Response): Promise<Response> => {
    const transaction = await getRepository(Transaction).findOne(req.params.id);
    if(transaction){
        
        getRepository(Transaction).merge(transaction, req.body);
        const results = await getRepository(Transaction).save(transaction);
        return res.json(results);
    }
    
    return res.status(404).json({message: 'Transaction not found'});
};