import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICasino } from "../types";

interface CasinoState {
	data: Array<ICasino>;
}

const initialState: CasinoState = {
	data: [],
};

export const casinoSlice = createSlice({
	name: "casino",
	initialState,
	reducers: {
		setCasinos: (state, action: PayloadAction<Array<ICasino>>) => {
			state.data = action.payload;
		},
		updateCasinoOrder: (state, action: PayloadAction<Array<ICasino>>) => {
			state.data = action.payload;
		},
	},
});

export const { setCasinos, updateCasinoOrder } = casinoSlice.actions;

export default casinoSlice.reducer;
