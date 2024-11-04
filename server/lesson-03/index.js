import express from 'express';
import axios from 'axios';
import { v4 } from 'uuid';

const app = express();
app.use(express.json());

const dbUrl = 'http://localhost:3000';

app.get('/users', (req, res) => {
    try {
        fetch(`${dbUrl}/users`).then((rs) => {
            return rs.json(); // data
        }).then((data) => {            
            res.send({
                message: 'Get users success',
                status: 'success',
                data
            });
        }) 
    } catch (error) {
        console.log(error);
    };
});

// Register new user
app.post('/register', async (req, res) => {
    try {
        const { userName } = req.body;
        const userId = `US${v4().slice(0, 4)}`;

        // Check input data
        if (!userName) throw new Error('User name is required!');

        const { data: users } = await axios.get(`${dbUrl}/users`);
        if (users.some(user => user.userName === userName)) {
            return res.status(400).send({
                message: 'User nam da ton tai',
                status: 'faild',
                data: { userName }
            })
        }

        const newUser = {
            userId,
            userName
        }
        await axios.post(`${dbUrl}/users`, newUser);

        res.status(201).send({
            message: 'Create user success',
            status: 'success',
            data: newUser
        })

    } catch (error) {
        res.status(403).send({
            message: error.message,
            status: 'faild',
            data: null
        })
    };
});

app.listen(8080, () => {
    console.log('Server is running!');
});