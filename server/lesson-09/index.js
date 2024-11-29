import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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


// Lesson 8 - Token
const secretKey = 'mysecretkey';

// Dữ liệu mẫu được trả về (Payload)
const userData = {
    id: "123",
    username: 'Tuong Le',
    role: 'user'
}

// Ký tạo token (mã hóa)
const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });
console.log(token);

// Xác thực jwt
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.log(new Error('JWT verification faild'), err.message);
    } else {
        console.log('Decoded JWT');
        console.log(decoded);
    }
})

app.get('/validate-token', (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.replace('Bear ', '');
        console.log('12345');
        console.log(token);

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).json({
                    message: 'Access token is invalid'
                });
            } else {
                console.log(decoded);
                req.user = decoded;

                console.log('user: ', req.user);
                next();
            }
        })
    } else {
        res.status(410).json({
            message: 'Access token is missing'
        });
    }

    console.log(authHeader);
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