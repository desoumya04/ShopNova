import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use("/api/v1", router)


export default app;