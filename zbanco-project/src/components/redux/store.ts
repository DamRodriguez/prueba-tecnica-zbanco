import { configureStore } from "@reduxjs/toolkit";
import transferReducer from "./transfer/transferSlice";

export const store = configureStore({
  reducer: {
    transfer: transferReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
