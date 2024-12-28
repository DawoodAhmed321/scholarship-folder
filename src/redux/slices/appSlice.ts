import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    dashboardLoader: false,
    footer: {
      facebook: "https://www.facebook.com/",
      twitter: "https://twitter.com/",
      instagram: "https://www.instagram.com/",
      mobile: "+1234567890",
      email: "syedsaad047@gmail.com",
      address: "China, Beijing",
      start_time: "09:00 AM",
      end_time: "06:00 PM",
    },
  },
  reducers: {
    setDashboardLoader: (state, action) => {
      state.dashboardLoader = action.payload;
    },
    setFooter: (state, action) => {
      state.footer = action.payload;
      return state;
    },
  },
});

export const { setDashboardLoader, setFooter } = appSlice.actions;
export default appSlice.reducer;
