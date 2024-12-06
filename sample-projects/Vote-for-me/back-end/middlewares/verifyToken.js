const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next)=>{
    //Access Authorization form req header
    const Authorization = req.header('authorization');

    if(!Authorization){
        // Error: Unauthorized
        const err = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    }

    //Get token
    // Replace Bearer thanh ''
    //Bearer dfjfdjfsdfdfdkfdjgdgkjfdzfksaj
    const token = Authorization.replace('Bearer ', '');

    //Veryfy token
    const {userId} = jwt.verify(token, process.env.APP_SECRET);

    // Assign vao req
    req.user = {userId};

    // Next to next controller
    next();
}