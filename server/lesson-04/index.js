import express from 'express';
import mongoose from 'mongoose';
import UserModel from './model/users.js';

mongoose.connect('mongodb+srv://web81_admin:web81_admin_password@cluster0.f51ge.mongodb.net/WEB85');

const app = express();
app.use(express.json());

app.post('/api/v1/users', async (req, res) => {
    try {
        const { userName, email } = req.body;
        if (!userName) throw new Error('User name is required!');
        if (!email) throw new Error('Email is required!');

        // Find one user
        const existedEmail = await UserModel.findOne({
            email
        });

        // Find all with filter
        // const existedEmail = await UserModel.find({
        //     email
        // });

        // Find by ID
        // const existedEmail = await UserModel.findById('672e1540944ae9d3e7b42b1e');
        
        if (existedEmail) throw new Error('Email already exists');

        const createdUser = await UserModel.create({
            userName,
            email
        });


        res.status(201).send({
            message: 'Register successfuly!',
            data: createdUser,
            success: true
        })

    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        })
    }
})

app.get('/api/v1/users', async (req, res) => {
    try {
        // const { userName } = req.query;
        // const filterUsers = userName ? { userName } : {};

        const users = await UserModel.find(req.query);

        res.status(201).send({
            message: 'Get user successfuly!',
            data: users,
            success: true
        })

    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        })
    }
})

app.get('/api/v1/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserModel.findById(userId);
        if (!user) throw new Error('User is not exists');

        res.status(201).send({
            message: 'User found!',
            data: user,
            success: true
        })

    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        })
    }
})

app.put('/api/v1/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { userName } = req.body;

        // const currentUser = await UserModel.findById(userId);
        // if (!currentUser) throw new Error('User is not exists');
        // currentUser.userName = userName;
        // await currentUser.save();

        const currentUser = await UserModel.findByIdAndUpdate(userId, { userName });
        if (!currentUser) throw new Error('User is not exists');

        // UserModel.findOneAndUpdate()
        // UserModel.updateOne()
        // await UserModel.updateMany({ userName: 'TuongLN2'} , { userName });

        // UserModel.deleteMany
        // UserModel.deleteOne
        // UserModel.findOneAndDelete
        // UserModel.findByIdAndDelete

        res.status(201).send({
            message: 'Updated info!',
            data: currentUser,
            success: true
        })

    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        })
    }
})

app.delete('/api/v1/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) throw new Error('User is not exists');

        res.status(201).send({
            message: 'Delete user!',
            data: deletedUser,
            success: true
        })

    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
            success: false
        })
    }
})


app.listen(8080, () => {
    console.log('Server is running!');
})