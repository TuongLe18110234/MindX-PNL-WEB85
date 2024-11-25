import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controller/userController.js';
import { authorize, roles } from '../middleware/authorize.js';

const Router = express.Router();

// Khoi tao cac route
Router.route('/').post(authorize(roles.admin), createUser).get(authorize(roles.user), getAllUsers);
Router.route('/:userId').get(getUserById).put(authorize(roles.user), updateUser).delete(deleteUser);

export default Router;