import BookModel from '../model/book.js';
import PostModel from '../model/posts.js';

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find(req.query);

        res.status(201).send({
            message: 'Get post successfuly!',
            data: posts,
            success: true
        })
    } catch (error) {
        next(error);
    }
};


export const getAllBooks = async (req, res, next) => {
    try {
        const posts = await BookModel.find().populate('authorClone', 'name').populate('author')

        res.status(201).send({
            message: 'Get post successfuly!',
            data: posts,
            success: true
        })
    } catch (error) {
        next(error);
    }
};

export const createPost = async (req, res, next) => {
    try {
        // Tạo một cuốn sách tham chiếu đến tác giả
        const book = new BookModel({
            title: 'Harry Potter and the Sorcerer\'s Stone',
            author: '6749bbded8ecffe18ec18b30', // Tham chiếu đến tác giả
        });

        // Lưu cuốn sách vào cơ sở dữ liệu
        await book.save();

        return res.json("Tạo sách thành công")
    } catch (error) {
        next(error);
    }
};