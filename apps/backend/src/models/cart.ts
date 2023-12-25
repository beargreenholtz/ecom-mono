import type { Document, Types } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

import type { CartItem } from '../types/cart';

type CartDocument = Document & {
	userId: Types.ObjectId;
	items: CartItem[];
};

const cartSchema = new Schema<CartDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	items: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
});

const Cart = mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;
