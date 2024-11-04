import express from 'express';
const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
    try {
        fetch('http://localhost:3000/users').then((rs) => {
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

app.post('/register', (req, res) => {
    try {
        const {userName, email, password} = req.body;

        // Check input data
        if (!userName) throw new Error('User name is required!');
        if (!email) throw new Error('Email is required!');
        if (!password) throw new Error('Password is required!');

        const newUser = {
            userName,
            email,
            password
        }

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