import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controller/userController.js';

const Router = express.Router();

// Khoi tao cac route
Router.route('/').post(createUser).get(getAllUsers);
Router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);


export default Router;