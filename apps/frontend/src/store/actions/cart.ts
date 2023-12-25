import type { TCartItem } from '@/types/api/cart';

export const CART_ITEMS_CHANGE = '[SHOP] CART_ITEMS_CHANGE';

export type CartItemAction = {
	type: typeof CART_ITEMS_CHANGE;
	payload: {
		items: TCartItem[];
	};
};

export const cartItemsUpdate = (newItems: TCartItem[]): CartItemAction => {
	return {
		type: CART_ITEMS_CHANGE,
		payload: {
			items: [...newItems],
		},
	};
};

export type CartActionTypes = CartItemAction;
