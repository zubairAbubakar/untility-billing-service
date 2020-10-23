import { Router } from 'express';
import { createTransaction, getTransaction, getTransactions, updateTransaction } from '../controllers/transaction.controller'

const router = Router();

//REST API routes
router.get('/api/transactions/:id', getTransaction);
router.get('/api/transactions', getTransactions);
router.post('/api/transactions', createTransaction);
router.put('/api/transactions/:id', updateTransaction);

export default router;