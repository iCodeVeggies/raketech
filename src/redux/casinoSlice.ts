import { createSlice } from "@reduxjs/toolkit";
import { ICasino } from "../types";

interface CasinoState {
	data: Array<ICasino>;
}

const initialState: CasinoState = {
	data: [],
};

  export const casinoSlice = createSlice({
	name: "casinos",
	initialState,
	reducers: {
	  setCasinos: (state, action) => {
		state.data = action.payload;
	  },
	}
  });
  
  export const { setCasinos } = casinoSlice.actions;
  
  export default casinoSlice.reducer;