// store.ts (or store.js)
import { configureStore } from '@reduxjs/toolkit';
import casinoReducer from './casinoSlice';

const store = configureStore({
  reducer: {
    casino: casinoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
