import mongoose from 'mongoose';
import Collections from '../database/collection.js';

// Định nghĩa các field cho document và kiểu dữ liệu của field đó
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String, // Mk@123456
    salt: String, // Mk@123456
    role: String,
}, { timestamps: true });

const UserModel = mongoose.model(Collections.USERS, userSchema);
export default UserModel;