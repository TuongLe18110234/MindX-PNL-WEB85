export const roles = {
    admin: 'admin',
    user: 'user'
}

export const authorize = (requireRole) => {
    return (req, res, next) => {
        try {
            const { api_key } = req.query;
            if (!api_key) res.status(403).send('Forbiden');

            const { role } = JSON.parse(api_key);
            if (role === requireRole) {
                next();
            } else {
                res.status(403).send('Forbiden');
            }

        } catch (error) {

        }
    }
};