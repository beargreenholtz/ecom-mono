import jwt, {} from 'jsonwebtoken';
import HttpError from '../models/http-error';
const checkAuth = (req, _, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Admin faild');
        }
        console.log('got');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userRole = decodedToken.role;
        if (userRole !== 'admin') {
            throw new Error('No admin');
        }
        next();
    }
    catch (error) {
        const newerror = new HttpError('auth failed', 401);
        return next(newerror);
    }
};
export default checkAuth;
