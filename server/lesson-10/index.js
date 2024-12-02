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


// Lesson 10 - Upload file
// Khởi tạo storage, chọn nơi lưu trữ là memoryStorage
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post('/upload', upload.single('file'), (req, res) => {
    // Truy cập dữ liệu từ req.file
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'Không có tệp được tải lên.'});
    }

    res.json({
        message: 'Tệp tải lên thành công!',
        data:  file
    })
})

cloudinary.config({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret // Click 'View API Keys' above to copy your API secret
})

app.post('/api/v1/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    
    if (!file) {
        return res.status(400).json({ error: 'Không có tệp được tải lên.' });
    }

    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const fileName = file.originalname.split('.')[0];

    const uploadResult = await cloudinary.uploader.upload(dataUrl, {
                                                public_id: fileName,
                                                resource_type: 'auto'
                                            }).catch((error) => {
                                                console.log(error);
                                                return res.status(400).json({ error: 'Không có tệp được tải lên.' });
                                            });


    console.log(uploadResult);
    res.json({
        message: 'Tệp tải lên thành công!',
        data:  uploadResult
    })
})


app.post('/api/v1/upload-multiple', upload.array('files'), (req, res) => {
    const listFile = req.files;
    
    if (!listFile) {
        return res.status(400).json({ error: 'Không có tệp được tải lên.' });
    }

    const listResult = [];
    listFile.forEach(file => {
        const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const fileName = file.originalname.split('.')[0];
    
        cloudinary.uploader.upload(dataUrl, {
            public_id: fileName,
            resource_type: 'auto',
            // có thể thêm field folder nếu như muốn tổ chức
        }, (err, result) => {
            if (result) {
                console.log(result);
                listResult.push(result);
            }
        });
    })


    res.json({
        message: 'Tệp tải lên thành công!',
        data:  listResult
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