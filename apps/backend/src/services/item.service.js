import {} from '../types/item';
import Product from '../models/product';
export const createItem = async (user) => {
    const newItem = new Product({
        name: user.name,
        imageUrl: user.imageUrl,
        price: user.price,
        stock: user.stock,
    });
    await newItem.save();
    return newItem;
};
export const getAllItems = async (limit) => {
    return await Product.find({}).limit(limit);
};
export const getItemById = async (id) => {
    return await Product.findOne({ _id: id });
};
export const updateItemById = async (info) => {
    return await Product.findOneAndUpdate({ _id: info.id }, { name: info.name, stock: info.stock, price: info.price, imageUrl: info.imageUrl });
};
