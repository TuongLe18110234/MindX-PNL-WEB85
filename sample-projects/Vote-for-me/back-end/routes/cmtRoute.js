const express = require('express');

const {getAllComments, createOneComment, getOneCommentById,
        updateOneComment, deleteOneComment} = require('../controllers/cmtController');

const {verifyToken} = require('../middlewares/verifyToken');

const Router = express.Router();

//Lay toan bo
// Befor create post need to verify token
Router.route('/').get(getAllComments).post(verifyToken, createOneComment);

//Truyen vao id
Router.route('/:cmtId').get(verifyToken, getOneCommentById).put(verifyToken, updateOneComment).delete(verifyToken, deleteOneComment);

module.exports = Router;