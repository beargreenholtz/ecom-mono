import type { cartItem } from '@/types/api/cart';
import * as actions from '../actions/cart';

const initialState: State = {
	isAuthenticated: false,
	cartItems: [],
};

export type State = {
	isAuthenticated: boolean;
	cartItems: cartItem[];
};

export const reducer = (state: State = initialState, action: actions.CartActionTypes): State => {
	switch (action.type) {
		case actions.CART_ITEMS_CHANGE: {
			const updatedCartItems = state.cartItems.map((cartItem) => {
				const newItem = action.payload.items.find((item) => item.name === cartItem.name);

				if (newItem) {
					return {
						...cartItem,
						quantity: cartItem.quantity + newItem.quantity,
					};
				}

				return cartItem;
			});

			action.payload.items.forEach((newItem) => {
				if (!state.cartItems.some((item) => item.name === newItem.name)) {
					updatedCartItems.push(newItem);
				}
			});

			return {
				...state,
				cartItems: updatedCartItems,
			};
		}

		default: {
			return state;
		}
	}
};
