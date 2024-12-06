const express = require('express');

const {getAllPosts, createOnePost, updateOnePost, deleteOnePost, getOnePostById,
        updateListVotes} = require('../controllers/postController.js');

const {verifyToken} = require('../middlewares/verifyToken');

const Router = express.Router();

//Lay toan bo
// Befor create post need to verify token
Router.route('/').get(getAllPosts).post(verifyToken, createOnePost);


//
Router.route('/vote/:postId').put(verifyToken, updateListVotes)

//Truyen vao id
Router.route('/:postId').get(getOnePostById).put(verifyToken, updateOnePost).delete(verifyToken, deleteOnePost);

module.exports = Router;