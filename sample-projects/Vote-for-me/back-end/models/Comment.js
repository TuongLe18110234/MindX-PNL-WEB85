const mongoose = require('mongoose');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const cmtSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Comment must have content'],
        trim: true},
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        //Chi lay userId
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

// // Gán một hàm cho object 'methods' của cmtSchema
// cmtSchema.methods.getContent = function(cb) {
//     return this.content;
// };

//Tao model dựa vào cơ chế cmtShema
const Comment = mongoose.model('Comment', cmtSchema)

// var comment = new Comment({content: "Hello word!"})
// comment.save()

// console.log(comment.getContent())

module.exports = Comment;