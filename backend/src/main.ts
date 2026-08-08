import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello, hi World!');
});



import sellerRoutes from './routes/seller.route.js';
app.use('/api/v1', sellerRoutes);



import userRoutes from './routes/user.route.js';
app.use('/api/v1', userRoutes);


import productRoutes from './routes/product.route.js';
app.use('/api/v1', productRoutes);

export default app;