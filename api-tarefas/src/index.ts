// src/index.ts
import express from 'express';
import router from './routes/router'
const app = express();
const PORTA = 3333;

// Middleware "tradutor" de JSON (CRUCIAL)
app.use(express.json()); 

app.use(router)

app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});