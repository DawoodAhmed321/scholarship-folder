import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "./slices/toastSlice";
import modalSlice from "./slices/modalSlice";
import appSlice from "./slices/appSlice";
import offerSlice from "./slices/offerSlice";
import scholarshipSlice from "./slices/scholarshipSlice";
import testimonialSlice from "./slices/testimonialSlice";

export const store = configureStore({
  reducer: {
    toast: toastSlice,
    modal: modalSlice,
    app: appSlice,
    offers: offerSlice,
    scholarships: scholarshipSlice,
    testimonials: testimonialSlice,
  },
});

export type TState = ReturnType<typeof store.getState>;
export const appDispatch = store.dispatch;
export const appState = store.getState();
