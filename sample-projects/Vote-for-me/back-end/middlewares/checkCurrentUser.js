const jwt = require('jsonwebtoken');

exports.checkCurrentUser = (req, res, next) =>{
    // Access Authorization form header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        req.user = null;
        next();
    } else {
        // Get token form Authorization
        const token = Authorization.replace('Bearer ', '');

        // verify token
        try {
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            req.user = { userId };
            next();
        } catch {
            req.user = null;
            next();
        }
    }
}