import express from 'express';
import { getAllPosts } from '../controller/postController.js';

const Router = express.Router();

// Khoi tao cac route
Router.route('/').get(getAllPosts);

export default Router;