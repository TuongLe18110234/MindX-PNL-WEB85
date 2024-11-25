
import jwt from 'jsonwebtoken';
import UserModel from "../model/users.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({email});
        if (!user) throw new Error("Email does't exists!");
        if (user && user.password === password) {
            const token = jwt.sign({ email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h'});
            console.log(token);
            const api_key = `web-${user.id}-${email}-${token}`

            res.status(201).send({
                message: 'Login successfuly!',
                data: { api_key },
                success: true
            })
        } else {
            throw new Error('No correct password!')
        }

    } catch (error) {
        next(error);
    }
}