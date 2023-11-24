import { type TItem } from '../types/item';
import Product from '../models/product';

export const createItem = async (user: TItem) => {
	const newItem = new Product({
		name: user.name,
		imageUrl: user.imageUrl,
		price: user.price,
		stock: user.stock,
		category: user.category.toLocaleLowerCase(),
	});

	await newItem.save();

	return newItem;
};

export const getAllItems = async (limit: number) => {
	return await Product.find({}).limit(limit);
};

export const getItemById = async (id: string) => {
	return await Product.findOne({ _id: id });
};

export const updateItemById = async (info: TItem) => {
	return await Product.findOneAndUpdate(
		{ _id: info.id },
		{ name: info.name, stock: info.stock, price: info.price, imageUrl: info.imageUrl },
	);
};

export const getAllItemsByCategory = async (category: string) => {
	return await Product.find({ category: category });
};

export const getItemByName = async (name: string) => {
	return await Product.findOne({ name: name });
};
