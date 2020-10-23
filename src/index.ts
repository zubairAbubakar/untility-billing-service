import 'reflect-metadata';
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createConnection } from 'typeorm'

import userRoutes from './routes/user.routes'
import transactionRoutes from './routes/transaction.routes'


//create an instance of express
const app = express();
createConnection().catch((error) => console.log(error));

//create middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//create routes
app.use(userRoutes);
app.use(transactionRoutes);

let server = app.listen(9000);
console.log('server on port', 9000);

module.exports = server