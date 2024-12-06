import mongoose from 'mongoose';
import Collections from '../database/collection.js';

// Định nghĩa các field cho document và kiểu dữ liệu của field đó
const postSchema = new mongoose.Schema({
    authorId: String,
    content:  String
}, { timestamps: true })

const PostModel = mongoose.model(Collections.POSTS, postSchema);
export default PostModel;