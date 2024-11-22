import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import myLogger from './middleware/logger.js';
import handleError from './middleware/handleError.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import authRoute from './routes/authRoute.js';
import UserModel from './model/users.js';

dotenv.config();

console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL);

// Khởi tạo web express
const app = express();

// Cho phép sử dụng json trong body
app.use(express.json());
// Add middleware myLogger, thực hiện khi gọi request
// Function nào được use trước thì chạy trước có request
app.use(myLogger);


// Lesson 7 - Hash password, ENV
const saltRounds = 10;

app.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    // Tạo chuỗi ngẫu nhiên
    // const salt = bcrypt.genSaltSync(saltRounds);
    const salt = process.env.SALT;
    console.log(salt);

    // Mã hóa mật khẩu
    const hash = bcrypt.hashSync(password, salt);

    // Insert user
    const newUser = await UserModel.create({
        email,
        password: hash,
        salt
    })

    res.status(201).send({newUser});
})


app.post('/login-hash', async (req, res, next) => {
    const { email, password } = req.body;

    const currentUser = await UserModel.findOne({email});
    if (!currentUser) new Error('Sai tài khoản');

    const hashingPassword = bcrypt.hashSync(password, currentUser.salt);

    console.log(hashingPassword);

    if (hashingPassword !== currentUser.password) throw new Error('Sai mật khẩu');

    res.status(201).send({
        email,
        message: 'Success'
    })
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