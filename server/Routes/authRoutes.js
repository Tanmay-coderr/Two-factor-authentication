import express from 'express';

import { login, logout, Register } from '../controllers/authController.js';



const routes = express.Router();
routes.post("/register",Register);
routes.post("/login",login);
routes.post("/logout",logout);
export default routes;