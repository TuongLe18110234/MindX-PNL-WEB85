import mongoose from 'mongoose';
import Collections from '../database/collection.js';

// Định nghĩa các field cho document và kiểu dữ liệu của field đó
const commentSchema = new mongoose.Schema({
    postId: String,
    content:  String,
    authorId:  String
})

const CommentModel = mongoose.model(Collections.COMMENTS, commentSchema);
export default CommentModel;