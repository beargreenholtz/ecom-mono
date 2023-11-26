import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { encryptionConfig } from '../config/encrypt-config';
import {
	createOtp,
	createUser,
	findOtp,
	getAllUsers,
	getUserByEmail,
	saveResetPasswordTokenOnUser,
	saveUserWithNewPassword,
	updateUserById,
} from '../services/user.service';
import HttpError from '../models/http-error';
import type {
	TLoginGenerateOtpHandler,
	TLoginOtpHandler,
	TOtp,
	TPassReset,
	TSignUpHandler,
	TSuccessgoogleauth,
	TUser,
	TUserOrigin,
} from '../types/user';
import mailSender from '../utils/mail-sender';
import generateOtp from '../utils/generate-otp';

export const signUpHandler: TSignUpHandler = async (info: TUser) => {
	const isUserExist = await getUserByEmail(info.email);

	if (isUserExist) throw new HttpError('user already exist', 500);

	const hashedPassword = await bcrypt.hash(info.password, 12);

	if (!hashedPassword) throw new HttpError('No password', 500);

	const createdUser = await createUser(info, hashedPassword);

	const token = jwt.sign(
		{
			userId: createdUser.id,
			email: createdUser.email,
			username: createdUser.username,
			role: createdUser.role,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '1h',
		},
	);

	await mailSender(
		info.email,
		'Welcome to EcomNow',
		'<img src="https://media.istockphoto.com/id/672526776/photo/cheddar-cheese-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=T6ykJOn4asR7Z21IG9D-ZdNUhEAHFW14lyqeq6a8io0=" alt="Chedder">',
	);

	return {
		userid: createdUser.id,
		token,
	};
};

export const loginGenerateOtpHandler: TLoginGenerateOtpHandler = async (info: TOtp) => {
	if (!info.email || !info.password) throw new HttpError('Error getting info', 402);

	const existingUser = await getUserByEmail(info.email);

	if (!existingUser) throw new HttpError('Cant Find User', 402);

	const isValidPassword = await bcrypt.compare(info.password, existingUser.password);

	if (!isValidPassword) throw new HttpError('Not a valid password', 402);

	const otp = generateOtp(6);

	const hashedOtp = await bcrypt.hash(otp, 12);

	const otpPayload = { email: info.email, otp: hashedOtp };

	const cipher = crypto.createCipheriv(
		encryptionConfig.algorithm,
		encryptionConfig.securityKey,
		encryptionConfig.initVector,
	);

	let encryptedOtpPayload = cipher.update(JSON.stringify(otpPayload), 'utf8', 'hex');

	encryptedOtpPayload += cipher.final('hex');

	createOtp(otpPayload);

	await mailSender(
		info.email,
		'Verification Email',
		`<h1>Please confirm your OTP</h1>
		   <p>Here is your OTP code: ${otp}</p>`,
	);

	return {
		encryptedOtpPayload,
	};
};

export const loginOtpHandler: TLoginOtpHandler = async (info: TOtp) => {
	if (!info.otp || !info.token) throw new HttpError('Error getting info', 402);

	const decipher = crypto.createDecipheriv(
		encryptionConfig.algorithm,
		encryptionConfig.securityKey,
		encryptionConfig.initVector,
	);

	let decryptedData = decipher.update(info.token, 'hex', 'utf8');

	const finalDecryptedObject = JSON.parse((decryptedData += decipher.final('utf8')));

	const otpUser = await findOtp(finalDecryptedObject.otp);

	if (!otpUser) throw new HttpError('Cant Find Otp, Login Again', 402);

	const isValidPassword = await bcrypt.compare(info.otp, otpUser.otp);

	if (!isValidPassword) throw new HttpError('Otp Doesnt Match', 402);

	const existingUser = await getUserByEmail(otpUser.email);

	if (!existingUser) throw new HttpError('Cant Find User', 402);

	const token = jwt.sign(
		{ userId: existingUser.id, email: existingUser.email, username: existingUser.username },
		process.env.JWT_SECRET,
		{
			expiresIn: '1h',
		},
	);

	return {
		userId: existingUser._id,
		email: existingUser.email,
		token,
	};
};

export const passwordResetGeneratorHandler = async (email: string) => {
	const existingUser = await getUserByEmail(email);

	if (!existingUser) throw new HttpError('Cant Find User', 402);

	const resetPasswordToken = crypto.randomBytes(32).toString('hex');

	const hashedPassword = await bcrypt.hash(resetPasswordToken, 12);

	const encryptInfo = {
		email,
		resetPasswordToken,
	};

	const cipher = crypto.createCipheriv(
		encryptionConfig.algorithm,
		encryptionConfig.securityKey,
		encryptionConfig.initVector,
	);

	let encryptedData = cipher.update(JSON.stringify(encryptInfo), 'utf8', 'hex');

	encryptedData += cipher.final('hex');

	await saveResetPasswordTokenOnUser(existingUser, hashedPassword);

	const resetLink = `${process.env.CLIENT_HOME_PAGE_URL}/auth/resetpassword/confirm/${encodeURIComponent(
		encryptedData,
	)}`;

	await mailSender(
		email,
		'Password Reset Request',
		`To reset your password, click on this link: ${resetLink}`,
	);

	return resetLink;
};

export const passwordResetHandler = async (info: TPassReset) => {
	if (!info.resetPasswordToken) throw new HttpError('Error getting info', 402);

	const decipher = crypto.createDecipheriv(
		encryptionConfig.algorithm,
		encryptionConfig.securityKey,
		encryptionConfig.initVector,
	);

	let decryptedData = decipher.update(info.resetPasswordToken, 'hex', 'utf8');

	const finalDecryptedObject = JSON.parse((decryptedData += decipher.final('utf8')));

	const user = await getUserByEmail(finalDecryptedObject.email);

	if (!user || !user.resetPasswordToken || !user.resetPasswordTokenExpiration)
		throw new HttpError('No user found', 402);

	if (user.resetPasswordTokenExpiration < Date.now()) throw new HttpError('No user found', 402);

	const isValidToken = await bcrypt.compare(
		finalDecryptedObject.resetPasswordToken,
		user.resetPasswordToken,
	);

	if (!isValidToken) throw new HttpError('Wrong token!', 402);

	const hashedPassword = await bcrypt.hash(info.newPassword, 12);

	const newUser = await saveUserWithNewPassword(user, hashedPassword);

	if (!newUser) throw new HttpError('Password reset failed', 402);
};

export const callbackGoogleAuthHandler = (userInfo: { _id: string; email: string }) => {
	const token = jwt.sign({ userId: userInfo._id, email: userInfo.email }, process.env.JWT_SECRET, {
		expiresIn: '1h',
	});

	return token;
};

export const successGoogleAuthHandler = (info: TSuccessgoogleauth) => {
	const token = jwt.sign(
		{ userId: info._id, email: info.email, username: info.name },
		process.env.JWT_SECRET,
		{
			expiresIn: '1h',
		},
	);

	return token;
};

export const getAllUsersHandler = async () => {
	const allItems = await getAllUsers();

	if (!allItems) throw new HttpError('cant find products', 500);

	return allItems;
};

export const editUserHandler = async (info: TUserOrigin) => {
	const user = await updateUserById(info);

	if (!user) throw new HttpError('cant find product', 500);

	return user;
};
