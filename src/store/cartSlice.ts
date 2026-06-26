import { createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../types/vegetables';

const cartSlice = createSlice({
	name: 'cartSlice',

	initialState: {
		cartItem: [] as CartItem[],
	},

	reducers: {
		addToCart: (state, action) => {
			const { product, count } = action.payload;
			const existing = state.cartItem.find((item) => item.id === product.id);

			if (existing) {
				existing.count += count;
			} else {
				state.cartItem.push({ ...product, count });
			}
		},

		updateCount: (state, action) => {
			const { id, newCount } = action.payload;
			const index = state.cartItem.findIndex((item) => item.id === id);

			if (index === -1) return;

			if (newCount < 1) {
				state.cartItem.splice(index, 1);
			} else {
				state.cartItem[index].count = newCount;
			}
		},
	},
});

export const { addToCart, updateCount } = cartSlice.actions;

export default cartSlice.reducer;
