//Import model
const User = require('../models/User');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');


//Ham bat dong bo
exports.register = async (req, res, next)=>{
    try{
        //Cho tao thanh cong luu vo bien user
        //rep.body = name, email, password
        const user = await User.create(req.body);

        //Tao jwt voi data va key
        const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);

        res.status(200).json({
            status: 'success',
            data: { token, userName: user.name, userId: user._id}
        })
    } catch(error){
        next(error);
    }
}

exports.login = async (req, res, next)=>{
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user){
            //Error: Email is not correct
            const err = new Error('Email is not correct');
            err.statusCode = 400;
            return next(err);
        }

        //req.body.password do nguoi dung nhap
        //user.password da duoc hash

        if(bcrypt.compareSync(req.body.password, user.password)){
            
            const token = jwt.sign({userId: user._id}, process.env.APP_SECRET);

            res.status(200).json({
                status: 'success',
                data: { token, userName: user.name, userId: user._id}
            })
        } else {
            //Error: Password is not correct
            const err = new Error('Password is not correct');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error){
        res.json(error);
    }
}

// Get current User
exports.getCurrentUser = async (req, res, next) =>{
    try{
        const data = {user: null}
        if(req.user){
            const user = await User.findOne({_id: req.user.userId});
            data.user = {userName: user.name, email: user.email, userId: user._id}
        }
        res.status(200).json({
            status: 'success',
            data: data
        })
        
    } catch (error){
        res.json(error);
    }
}