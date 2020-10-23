import { Router } from 'express';
import { getUser, getUsers, createUser, updateUser } from '../controllers/user.controller'

const router = Router();

//REST API routes
router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);

export default router;