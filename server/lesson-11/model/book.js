import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors', // Tham chiếu đến collection authors
    },
    authorClone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors', // Tham chiếu đến collection authors
    },
    cover: String
});

const BookModel = mongoose.model('books', bookSchema);
export default BookModel;