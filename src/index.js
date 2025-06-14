import express from 'express';
import cors from 'cors';
import productRouter from './routers/ProductRouter.js';
import userRouter from './routers/UserRouter.js';
import cartRouter from './routers/CartRouter.js';
import chatRouter from './routers/ChatRouter.js';

import mongoose from 'mongoose';

const app = express();
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
dotenv.config();

app.use(cors());
app.use(express.json());




app.use('/api', productRouter);
app.use('/api', userRouter);
app.use('/api', cartRouter);
app.use("/api", chatRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
