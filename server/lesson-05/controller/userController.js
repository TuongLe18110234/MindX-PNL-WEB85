import UserModel from "../model/users.js";

export const createUser = async (req, res, next) => {
    try {
        console.log('createUser');

        const { userName, email } = req.body;
        if (!userName) throw new Error('User name is required!');
        if (!email) throw new Error('Email is required!');

        // Find one user
        const existedEmail = await UserModel.findOne({
            email
        });
        
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
        next(error);
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find(req.query);

        res.status(201).send({
            message: 'Get user successfuly!',
            data: users,
            success: true
        })
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
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
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { userName } = req.body;

        const currentUser = await UserModel.findByIdAndUpdate(userId, { userName });
        if (!currentUser) throw new Error('User is not exists');

        res.status(201).send({
            message: 'Updated info!',
            data: currentUser,
            success: true
        })

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
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
        next(error);
    }
};
