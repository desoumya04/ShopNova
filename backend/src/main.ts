import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello, hi World!');
});

import sellerRoutes from './routes/seller.route.js';
app.use('/api/v1', sellerRoutes);

export default app;