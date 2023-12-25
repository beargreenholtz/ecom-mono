import type { Types } from 'mongoose';

export type CartItem = {
	_id: Types.ObjectId;
	productId: Types.ObjectId;
	quantity: number;
};
