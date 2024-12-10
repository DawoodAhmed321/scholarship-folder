import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/toastSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: {
    toast: toastSlice,
    modal: modalSlice,
  },
});

export type TState = ReturnType<typeof store.getState>;
export const appDispatch = store.dispatch;
export const appState = store.getState();
