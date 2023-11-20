import type { Response, NextFunction, RequestHandler } from 'express';
import passport from 'passport';
import { validationResult } from 'express-validator';

import type { TUser, TRequest, TOtp, TPassReset, TSuccessgoogleauth } from '../types/user';
import HttpError from '../models/http-error';
import {
	editUserHandler,
	getAllUsersHandler,
	loginGenerateOtpHandler,
	loginOtpHandler,
	passwordResetGenertorHandler,
	passwordResetHandler,
	signUpHandler,
	successGoogleAuthHandler,
} from '../handlers/user.handler';

export const signUp: RequestHandler = async (req: TRequest, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty())
			throw new HttpError('Invalid inputs passed, please check your data. got here ', 422);

		const userInfo = {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		} as TUser;

		if (!process.env.JWT_SECRET) throw new HttpError('No JWT Secret', 500);

		const createdUser = await signUpHandler(userInfo);

		if (!createdUser) throw new HttpError('General Error', 500);

		res.status(200).header('Authorization', `Bearer ${createdUser.token}`).json({ message: 'Succeses' });
	} catch (error) {
		return next(error);
	}
};

export const loginGenerateOtp: RequestHandler = async (req: TRequest, res: Response, next: NextFunction) => {
	try {
		if (!req.body.password || !req.body.email) throw new HttpError('General Error', 500);

		const otpInfo: TOtp = {
			email: req.body.email,
			password: req.body.password,
		};

		const encryptedOtpPayload = await loginGenerateOtpHandler(otpInfo);

		res.status(200).json({
			success: true,
			message: 'OTP sent successfully',
			otp: encryptedOtpPayload,
		});
	} catch (error) {
		return next(error);
	}
};

export const loginOtp: RequestHandler = async (req: TRequest, res: Response, next: NextFunction) => {
	try {
		const otpInfo: TOtp = {
			otp: req.body.otp,
			token: req.body.token,
		};

		const userInfo = await loginOtpHandler(otpInfo);

		res.status(200).header('Authorization', `Bearer ${userInfo.token}`).json({ message: 'Succeses' });
	} catch (error) {
		return next(error);
	}
};

export const passwordResetGenertor: RequestHandler = async (
	req: TRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.body.email) throw new HttpError('General Error', 500);

		const resetLink = await passwordResetGenertorHandler(req.body.email);

		res.json({
			resetLink: resetLink,
			email: req.body.email,
		});
	} catch (error) {
		next(error);
	}
};

export const passwordReset: RequestHandler = async (req: TRequest, res: Response, next: NextFunction) => {
	try {
		if (!req.params.resetPasswordToken || !req.body.newPassword)
			throw new HttpError('General Error', 500);

		const infoReset: TPassReset = {
			resetPasswordToken: req.params.resetPasswordToken,
			newPassword: req.body.newPassword,
		};

		if (!infoReset.newPassword) throw new HttpError('New password doesnt exist', 500);

		await passwordResetHandler(infoReset);

		res.json({ message: 'Password reset successful.' });
	} catch (error) {
		next(error);
	}
};

export const callbackGoogleAuth: RequestHandler = async (req, res, next) => {
	await passport.authenticate('google', {
		failureRedirect: '/user/failedgoogleauth',
	})(req, res, () => {
		try {
			if (!process.env.JWT_SECRET) throw new HttpError('No JWT secret', 500);

			if (!req.user?.email) throw new HttpError('General Error', 500);

			// const infoUser = {
			// 	_id: req.user._id,
			// 	email: req.user.email,
			// };

			// const token = callbackGoogleAuthHandler(infoUser);

			res.redirect(process.env.CLIENT_HOME_PAGE_URL);
		} catch (error) {
			next(error);
		}
	});
};

export const failedgoogleauth: RequestHandler = (_req, res) => {
	res.send('Failed');
};

export const successgoogleauth: RequestHandler = (req, res) => {
	if (req.user) {
		const userInfo: TSuccessgoogleauth = {
			_id: req.user._id,
			email: req.user.email,
			name: req.user.name,
		};

		const token = successGoogleAuthHandler(userInfo);

		res.status(200).header('Authorization', `Bearer ${token}`).json({ message: 'Succeses' });
	} else {
		res.status(403).json({ error: true, message: 'Not Authorized' });
	}
};

export const getAllUsers = async (_req, res: Response, next: NextFunction) => {
	try {
		const allUsers = await getAllUsersHandler();

		console.log(allUsers);
		res.status(200).json({ allUsers });
	} catch (error) {
		return next(error);
	}
};

export const editUser = async (req, res: Response, next: NextFunction) => {
	try {
		const info = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			role: req.body.role,
		};

		const item = await editUserHandler(info);

		res.status(200).json({ item });
	} catch (error) {
		return next(error);
	}
};
