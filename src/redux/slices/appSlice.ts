import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    dashboardLoader: false,
  },
  reducers: {
    setDashboardLoader: (state, action) => {
      state.dashboardLoader = action.payload;
    },
  },
});

export const { setDashboardLoader } = appSlice.actions;
export default appSlice.reducer;
