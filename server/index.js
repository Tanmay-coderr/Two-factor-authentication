import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import routes from './Routes/authRoutes.js';

const app= express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({credentials: true}));
const PORT =process.env.PORT || 4000;
connectDB();
app.use("/api/auth",routes)
app.listen(PORT,console.log(`Server started on ${PORT}`));