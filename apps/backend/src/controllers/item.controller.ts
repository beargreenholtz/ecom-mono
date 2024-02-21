import type { NextFunction, Response } from 'express';
import { type TRequest } from '../types/item';
import {
	createItemHandler,
	editItemHandler,
	getAllItemsHandler,
	getAllItemsByCategoryHandler,
	getItemByNameHandler,
} from '../handlers/item.handler';

export const createItem = async (req: TRequest, res, next: NextFunction) => {
	try {
		const info = {
			name: req.body.name,
			imageUrl: req.body.imageUrl,
			stock: req.body.stock,
			price: req.body.price,
			category: req.body.category,
		};

		console.log(req.body.category);

		const response = await createItemHandler(info);

		res.status(200).json({ response });
	} catch (error) {
		return next(error);
	}
};

export const getAllItems = async (req, res: Response, next: NextFunction) => {
	try {
		const allItems = await getAllItemsHandler(req.body.limit);

		res.status(200).json({ allItems });
	} catch (error) {
		return next(error);
	}
};

export const editItem = async (req, res: Response, next: NextFunction) => {
	try {
		const info = {
			id: req.body.id,
			name: req.body.name,
			imageUrl: req.body.imageUrl,
			stock: req.body.stock,
			price: req.body.price,
			category: req.body.category,
		};

		const item = await editItemHandler(info);

		res.status(200).json({ item });
	} catch (error) {
		return next(error);
	}
};

export const getAllItemsByCategory = async (req, res: Response, next: NextFunction) => {
	try {
		const allItems = await getAllItemsByCategoryHandler(req.params.category);

		res.status(200).json({ allItems });
	} catch (error) {
		return next(error);
	}
};

export const getItemByName = async (req, res: Response, next: NextFunction) => {
	try {
		const item = await getItemByNameHandler(req.params.itemName);

		res.status(200).json({ item });
	} catch (error) {
		return next(error);
	}
};
