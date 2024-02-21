import HttpError from '../models/http-error';

import { type TItem } from '../types/item';
import {
	createItem,
	getAllItems,
	updateItemById,
	getAllItemsByCategory,
	getItemByName,
} from '../services/item.service';

export const createItemHandler = async (info) => {
	if (!info) throw new HttpError('general error', 500);

	const newItem = await createItem(info);

	if (!newItem) throw new HttpError('error during creating product', 500);

	return newItem;
};

export const getAllItemsHandler = async (limit: number) => {
	const allItems = await getAllItems(limit);

	if (!allItems) throw new HttpError('cant find products', 500);

	return allItems;
};

export const editItemHandler = async (info: TItem) => {
	const item = await updateItemById(info);

	if (!item) throw new HttpError('cant find product', 500);

	return item;
};

export const getAllItemsByCategoryHandler = async (category: string) => {
	const allItems = await getAllItemsByCategory(category);

	if (!allItems) throw new HttpError('cant find products', 500);

	return allItems;
};

export const getItemByNameHandler = async (id: string) => {
	const item = await getItemByName(id);

	if (!item) throw new HttpError('cant find products', 500);

	return item;
};
