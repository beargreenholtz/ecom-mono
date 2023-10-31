import { configureStore, combineReducers } from '@reduxjs/toolkit';

import * as fromMenu from './reducers/menu';

const rootReducer = combineReducers({
	user: fromMenu.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
});
