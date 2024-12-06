import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'

import myLogger from './middleware/logger.js';
import handleError from './middleware/handleError.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import authRoute from './routes/authRoute.js';
import UserModel from './model/users.js';

dotenv.config();

console.log(process.env.DB_URL);
mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

// Khởi tạo web express
const app = express();

// Cho phép sử dụng json trong body
app.use(express.json());
// Add middleware myLogger, thực hiện khi gọi request
// Function nào được use trước thì chạy trước có request
app.use(myLogger);

// Lesson 11 - Data management
app.get('/get-all-users', async (req, res, next) => {
    try {
        const pageNumber = req.query.pageNumber ? req.query.pageNumber : 1;
        const pageSize = req.query.pageSize ? req.query.pageSize : 5;

        let query = {};
        // {email: {$regex: req.query.email, $options: 'i'}} -- Lọc tất cả user có email chứa req.query.email
        query = req.query.email ? {email: {$regex: req.query.email, $options: 'i'}} : {...query};

        const totalItems = await UserModel.countDocuments(query);
        const totalPages =  Math.ceil(totalItems / pageSize);

        const skip = (pageNumber - 1) * pageSize;

        const sort = JSON.parse(req.query.sort);
        console.log(sort);

        const users = await UserModel.find(query)
            .sort(sort) // 1 Tăng dần, -1 Giảm dần
            .skip(skip)
            .limit(pageSize)

        res.send({
            totalItems,
            skip,
            totalPages,
            items: users
        })
    } catch (e) {
        console.log(e);
        next(e);
    }
})


// Add route userRoute, thực hiện khi gọi request
app.use('/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);

// Add middleware handleError, thực hiện khi gọi request
app.use(handleError);

const PORT = process.env.PORT | 8080;
app.listen(PORT, () => {
    console.log('Server is running!');
})