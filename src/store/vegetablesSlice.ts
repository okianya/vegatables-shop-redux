import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Vegetable } from '../types/vegetables';
import ky from 'ky';

export const fetchVegetables = createAsyncThunk(
	'vegetables/fetchVegetables',

	async () => {
		const vegetables = await ky
			.get(
				'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json',
			)
			.json<Vegetable[]>();
		return vegetables;
	},
);

const vegetablesSlice = createSlice({
	name: 'vegetables',

	initialState: {
		item: [] as Vegetable[],
		loading: false,
		error: false,
	},

	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(fetchVegetables.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(fetchVegetables.fulfilled, (state, action) => {
				state.loading = false;
				state.item = action.payload;
			})
			.addCase(fetchVegetables.rejected, (state) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export default vegetablesSlice.reducer;
