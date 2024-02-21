import express from 'express';
import {
	createItem,
	editItem,
	getAllItems,
	getAllItemsByCategory,
	getItemByName,
} from '../controllers/item.controller';
import checkAuth from '../middleware/check-auth';

const router = express.Router();

router.post('/get-all-items', getAllItems);

router.post('/get-all-items-by-category/:category', getAllItemsByCategory);

router.post('/get-item-by-name/:itemName', getItemByName);

router.use(checkAuth);

router.post('/create', createItem);

router.post('/update', editItem);

export default router;
