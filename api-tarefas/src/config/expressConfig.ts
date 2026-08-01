// src/config/expressConfig.ts ← configuração do app Express
import express from 'express';
import { router } from '../routes/router';

const app = express();
app.use(express.json());
app.use('/tasks', router);

export { app };