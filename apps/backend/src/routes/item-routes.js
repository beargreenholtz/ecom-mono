import express from 'express';
import { createItem, editItem, getAllItems } from '../controllers/item.controller';
import checkAuth from '../middleware/check-auth';
const router = express.Router();
router.post('/getallitems', getAllItems);
router.use(checkAuth);
router.post('/create', createItem);
router.post('/update', editItem);
export default router;
