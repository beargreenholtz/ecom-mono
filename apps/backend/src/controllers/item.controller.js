import {} from '../types/item';
import { createItemHandler, editItemHandler, getAllItemsHandler } from '../handlers/item.handler';
export const createItem = async (req, res, next) => {
    try {
        const info = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            stock: req.body.stock,
            price: req.body.price,
        };
        const response = await createItemHandler(info);
        res.status(200).json({ response });
    }
    catch (error) {
        return next(error);
    }
};
export const getAllItems = async (req, res, next) => {
    try {
        const allItems = await getAllItemsHandler(req.body.limit);
        res.status(200).json({ allItems });
    }
    catch (error) {
        return next(error);
    }
};
export const editItem = async (req, res, next) => {
    try {
        const info = {
            id: req.body.id,
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            stock: req.body.stock,
            price: req.body.price,
        };
        const item = await editItemHandler(info);
        res.status(200).json({ item });
    }
    catch (error) {
        return next(error);
    }
};
