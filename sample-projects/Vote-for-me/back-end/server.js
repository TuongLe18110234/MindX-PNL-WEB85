//dotenv bien moi truong
require('dotenv').config();

//Connect DB
const {contentDB, connectDB} = require('./configs/db');

//Goi ham
connectDB();

const express = require('express');
const cors = require('cors');

// Ket noi voi routers
// Import Routes
const authRoute = require('./routes/authRoute');
const postRoute = require('./routes/postRoute');
const cmtRoute = require('./routes/cmtRoute')

// Import Error Handler
// Must after Routes
const {errorHandler} = require('./middlewares/errorHandler');

const app = express();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

//Mount the route (Ket noi route voi server)
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/posts', postRoute);
app.use('/api/v1/comments', cmtRoute);

//Unhandled Route
// '*' Access into all routes
app.all('*', (req, res, next)=>{
    const err = new Error('The route can not be found');
    err.statusCode = 404;
    next(err);
})

// Must after Routes
app.use(errorHandler);

//Mo port
const port = process.env.APP_PORT;

app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running on port ${port}`);
})