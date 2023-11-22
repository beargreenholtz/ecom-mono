import type { Request } from 'express';

type TParams = {
	resetPasswordToken?: string;
};

type TBody = {
	name?: string;
	imageUrl?: string;
	stock?: number;
	price?: number;
};

export type TRequest = Request<TParams, object, TBody>;

export type TItem = {
	id: string;
	imageUrl: string;
	name: string;
	stock: number;
	price: number;
};
