import jwt, {} from 'jsonwebtoken';
import HttpError from '../models/http-error';
import { verifyUserByUserId } from '../services/user.service';
const checkAuth = async (req, _, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('auth faildddddd');
        }
        console.log('got');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const isValidUser = await verifyUserByUserId(userId);
        if (isValidUser.email !== decodedToken.email) {
            throw new Error('No user');
        }
        next();
    }
    catch (error) {
        const newerror = new HttpError('auth failed', 401);
        return next(newerror);
    }
};
export default checkAuth;
