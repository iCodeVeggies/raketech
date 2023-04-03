import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import casinoReducer, { setCasinos } from "./casinoSlice";

export const fetchAndSortCasinos = createAsyncThunk(
	"casino/fetchAndSortCasinos",
	async (_, { dispatch }) => {
		const response = await fetch(
			`${process.env.REACT_APP_API_BASE_URL}/api/casinos`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch casinos");
		}
		const casinos = await response.json();
		const sortedCasinos = [...casinos].sort((a, b) => a.order - b.order);
		dispatch(setCasinos(sortedCasinos));
	}
);

const store = configureStore({
	reducer: {
		casino: casinoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(fetchAndSortCasinos());

export default store;
