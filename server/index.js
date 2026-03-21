import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';

const app= express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true}));
const PORT =process.env.PORT || 4000;
connectDB();
app.listen(PORT,console.log(`Server started on ${PORT}`));