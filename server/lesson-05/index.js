import express from 'express';
import mongoose from 'mongoose';
import myLogger from './middleware/logger.js';
import handleError from './middleware/handleError.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';

mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

// Khởi tạo web express
const app = express();

// Cho phép sử dụng json trong body
app.use(express.json());
// Add middleware myLogger, thực hiện khi gọi request
// Function nào được use trước thì chạy trước có request
app.use(myLogger);

// Add route userRoute, thực hiện khi gọi request
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);

// Add middleware handleError, thực hiện khi gọi request
app.use(handleError);

app.listen(8080, () => {
    console.log('Server is running!');
})