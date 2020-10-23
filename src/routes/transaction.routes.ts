import { Router } from 'express';
import { airtimePurchase, getTransaction, getTransactions, updateTransaction } from '../controllers/transaction.controller'

const router = Router();

//REST API routes
router.get('/api/transactions/:id', getTransaction);
router.get('/api/transactions', getTransactions);
router.post('/api/airtimePurchase', airtimePurchase);
router.put('/api/transactions/:id', updateTransaction);

export default router;