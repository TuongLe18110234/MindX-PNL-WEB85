import UserModel from "../model/users.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({email});
        if (!user) throw new Error("Email does't exists!");
        if (user && user.password === password) {
            res.status(201).send({
                message: 'Login successfuly!',
                data: {
                    email,
                    role: user.role
                },
                success: true
            })
        } else {
            throw new Error('No correct password!')
        }

    } catch (error) {
        next(error);
    }
}