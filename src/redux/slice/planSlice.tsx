import { createSlice } from '@reduxjs/toolkit';

type IPlanState = {
	searchTermValue: string;
};

const initialState: IPlanState = {
	searchTermValue: '',
};

export const planSlice = createSlice({
	name: 'planState',
	initialState,
	reducers: {
		searchValueState: (state, action) => {
			state.searchTermValue = action.payload;
		},
	},
});

export const { searchValueState } = planSlice.actions;

export default planSlice.reducer;
