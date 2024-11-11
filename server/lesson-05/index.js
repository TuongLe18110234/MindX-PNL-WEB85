import express from 'express';
import mongoose from 'mongoose';
import myLogger from './middleware/logger.js';
import handleError from './middleware/handleError.js';
import userRoute from './routes/userRoute.js';

mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

const app = express();

app.use(express.json());
app.use(myLogger);

app.use('/api/v1/users', userRoute);

app.use(handleError);

app.listen(8080, () => {
    console.log('Server is running!');
})