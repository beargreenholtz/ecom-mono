import type { Document } from 'mongoose';
import type { Request } from 'express';
import type mongoose from 'mongoose';

enum UserEnum {
	'user',
	'admin',
	'moderator',
	'guest',
}

type TBody = {
	name?: string;
	username?: string;
	email?: string;
	password?: string;
	otp?: string;
	newPassword?: string;
	token?: string;
};

type TParams = {
	resetPasswordToken?: string;
};

export type TOtp = {
	email?: string;
	password?: string;
	otp?: string;
	token?: string;
};

export type TPassReset = {
	resetPasswordToken: string;
	newPassword: string;
};

export type TSignUpHandler = (userInfo: TUser) => Promise<{ userid: string; token: string }>;

export type TLoginGenerateOtpHandler = (info: TOtp) => Promise<{
	encryptedOtpPayload: string;
}>;

export type TLoginOtpHandler = (info: TOtp) => Promise<{
	userId: string;
	email: string;
	token: string;
}>;

export type TUser = Document & {
	readonly _id: mongoose.Types.ObjectId;
	readonly id: string;
	readonly name: string;
	readonly username: string;
	readonly email: string;
	password: string;
	readonly role: UserEnum;
	readonly orders: string[];
	readonly reviews: string[];
	readonly googleId: string;
	resetPasswordToken?: string;
	resetPasswordTokenExpiration?: number;
};

export type TRequest = Request<TParams, object, TBody>;

export type TSuccessgoogleauth = {
	readonly _id: string;
	readonly name: string;
	readonly email: string;
};

export type TUserOrigin = {
	readonly id: string;
	readonly name: string;
	readonly email: string;
	readonly role: string;
};
