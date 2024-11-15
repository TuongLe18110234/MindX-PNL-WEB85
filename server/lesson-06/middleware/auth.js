const auth = {
    authentication: (req, res, next) => {
        const isAuthenticated = true;
        if (isAuthenticated) {
            next();
        } else {
            console.log('Unauthorized');
            res.status(401).send('Unauthorized');
        }
    },
    authorizationAdmin: (req, res, next) => {
        const { userRole } = req.query;
        if (userRole === 'admin') {
            next();
        } else {
            res.status(403).send('Forbiden');
        }
    }
}

export default auth;