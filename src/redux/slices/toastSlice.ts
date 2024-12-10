import {} from "react-redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toastSlice",
  initialState: {
    toasts: [],
  } as {
    toasts: Array<{
      id: number;
      message: string;
      type: "success" | "error" | "warning";
    }>;
  },
  reducers: {
    addToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "warning";
      }>
    ) => {
      state.toasts.push({
        id: state.toasts.length + 1,
        ...action.payload,
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
export default toastSlice.reducer;
