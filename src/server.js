// Workaround for MongoDB SRV DNS resolution on Node.js v24 / Windows
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import connectMongoDB from './db/connectMongoDB.js';
import {logger} from './middleware/logger.js';
import {notFoundHandler} from './middleware/notFoundHandler.js';
import {errorHandler} from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import { userRouter } from './routes/userRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const bootstrap = async () => {
  // підключення до MongoDB
await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(authRouter);
app.use(notesRouter);
app.use(userRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler); // повинен бути останнім

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
};
bootstrap();
