import { configureStore } from '@reduxjs/toolkit';
import vegetablesReducer from './vegetablesSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
	reducer: {
		vegetables: vegetablesReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
