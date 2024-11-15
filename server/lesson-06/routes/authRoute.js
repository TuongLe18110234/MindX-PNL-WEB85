import express from 'express';
import { login } from '../controller/authController.js';

const Router = express.Router();

// Khoi tao cac route
Router.route('/login').post(login);

export default Router;