import jwt from 'jsonwebtoken';

export const roles = {
    admin: 'admin',
    user: 'user'
}

export const authorize = (requireRole) => {
    return (req, res, next) => {
        try {
            const { api_key } = req.query
            if (!api_key) res.status(403).send('Forbiden');
            const token = api_key.split('-')[3];

            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Access token is invalid' });
                  } else {
                    // Lưu thông tin người dùng từ access token vào req
                    // tham số req sẽ được chuyển tiếp tới các handler tiếp theo

                    console.log('decodeed', decoded);
                    const { role } = decoded;
                    if (role === requireRole) {
                        req.user = decoded; 
                        delete req.query.api_key;
                        next();
                    } else {
                        res.status(403).send('Forbiden');
                    }
                  }
            })

        } catch (error) {

        }
    }
};