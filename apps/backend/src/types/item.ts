import type { Request } from 'express';

type TParams = {
	resetPasswordToken?: string;
};

type TBody = {
	name: string;
	imageUrl: string;
	stock: number;
	price: number;
	category: string;
};

export type TRequest = Request<TParams, object, Partial<TBody>>;

export type TItem = {
	id: string;
	imageUrl: string;
	name: string;
	stock: number;
	price: number;
	category: string;
};
