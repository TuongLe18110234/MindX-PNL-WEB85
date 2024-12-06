const mongoose = require('mongoose');

//Midware
const bcrypt = require('bcryptjs');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const userSchema = new mongoose.Schema({
    name:{
        type: String, 
        unique: true, 
        trim: true, 
        required: [true, 'Name must be required']},
    email:{
        type: String, 
        unique: true, 
        trim: true, 
        required: [true, 'Email must be required']},
    password:{
        type: String, 
        trim: true, 
        required: [true, 'Password must be required'], 
        minlength:[6, 'Password must be at least 6 characters']}
}, {timestamps: true})

// Trước khi lưu User xuống database sử dụng hàm
// Middleware để hash password
userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(error, hash){
        if(error){
            return next(error);
        }
        else{
            user.password = hash;
            next();
        }
    })
})

//Tao model dua vao co che userSchema
const User = mongoose.model('User', userSchema)

module.exports = User; 