import express from 'express';
import { createPost, getAllBooks, getAllPosts } from '../controller/postController.js';

const Router = express.Router();

// Khoi tao cac route
Router.route('/').get(getAllPosts);
Router.route('/get-all-book').get(getAllBooks);
Router.route('/create-post').post(createPost)
export default Router;