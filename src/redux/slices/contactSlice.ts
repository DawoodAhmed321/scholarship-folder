import { TContact, TJoinTeam, TPagination } from "@/configs/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: {
      data: [] as TContact[],
      pagination: {
        current_page: 1,
        last_page: 1,
      } as TPagination,
    },
    joinTeam: {
      data: [] as TJoinTeam[],
      pagination: {
        current_page: 1,
        last_page: 1,
      } as TPagination,
    },
  },
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
      return state;
    },
    setJoinTeam: (state, action) => {
      state.joinTeam = action.payload;
      return state;
    },
  },
});

export const { setContact, setJoinTeam } = contactSlice.actions;
export default contactSlice.reducer;
