import express from 'express';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello, hi World!');
});

import sellerRoutes from './routes/seller.route.js';
app.use('/api/v1', sellerRoutes);

export default app;