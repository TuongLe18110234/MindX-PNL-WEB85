import express from 'express';
import mongoose from 'mongoose';
import myLogger from './middleware/logger.js';
import handleError from './middleware/handleError.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import authRoute from './routes/authRoute.js';
import auth from './middleware/auth.js';
import { authorize, roles } from './middleware/authorize.js';

mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

// Khởi tạo web express
const app = express();

// Cho phép sử dụng json trong body
app.use(express.json());
// Add middleware myLogger, thực hiện khi gọi request
// Function nào được use trước thì chạy trước có request
app.use(myLogger);


// Lesson 6 - Authentication - Authorization
// const authentication = (req, res, next) => {    
//     const isAuthenticated = true; // Kiểm tra xem người dùng đã được xác thực hay chưa
//     if (isAuthenticated) {
//         console.log('Authenticated');

//         next();
//     } else {
//         console.log('Unauthorized');
//         res.status(401).send('Unauthorized');
//     }
// };
// app.use(authentication);

// const authorization = ((req, res, next) => {
//     const { userRole } = req.query;
//     if (userRole === 'admin') {
//         next();
//     } else {
//         res.status(403).send('Forbiden');
//     }
// });
// app.use(authorization);

// app.get('/api/v1/admin', auth.authorizationAdmin, (req, res, next) => {
//     res.send('Admin panel');
// })


// Add route userRoute, thực hiện khi gọi request
app.use('/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);

// Add middleware handleError, thực hiện khi gọi request
app.use(handleError);

app.listen(8080, () => {
    console.log('Server is running!');
})