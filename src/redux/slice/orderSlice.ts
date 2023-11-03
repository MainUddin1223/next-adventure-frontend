import { createSlice } from '@reduxjs/toolkit';

type IOrderState = {
	plan: any;
	quantity: number;
};

const initialState: IOrderState = {
	plan: {},
	quantity: 0,
};

export const orderSlice = createSlice({
	name: 'orderSummary',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			if (state?.plan?.id == action.payload.id) {
				state.quantity += 1;
			} else {
				state.plan = action.payload;
				state.quantity = 1;
			}
		},
		decreaseQuantity: (state) => {
			if (state.quantity > 1) {
				state.quantity -= 1;
				// state.plan = {}
				// state.quantity = 0
			}
		},
		dropFromCart: (state) => {
			state.plan = {};
			state.quantity = 0;
		},
	},
});

export const { addToCart, decreaseQuantity, dropFromCart } = orderSlice.actions;

export default orderSlice.reducer;
