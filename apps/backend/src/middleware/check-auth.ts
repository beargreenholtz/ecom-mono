import type express from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import HttpError from '../models/http-error';

import { verifyUserByUserId } from '../services/user.service';

const checkAuth = async (
	req: express.Request & { userData?: { userId: string } },
	_: express.Response | express.RequestHandler,
	next: express.NextFunction,
) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			throw new Error('auth failed');
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

		const userId = decodedToken.userId;

		const isValidUser = await verifyUserByUserId(userId);

		if (isValidUser.email !== decodedToken.email) {
			throw new Error('No user');
		}

		next();
	} catch (error) {
		const newError = new HttpError('auth failed', 401);

		return next(newError);
	}
};

export default checkAuth;
