import { configureStore, combineReducers } from '@reduxjs/toolkit';

import * as fromAuth from './reducers/auth';
import * as fromCart from './reducers/cart';

const rootReducer = combineReducers({
	user: fromAuth.reducer,
	cart: fromCart.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
});
