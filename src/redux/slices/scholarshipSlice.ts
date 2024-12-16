import { TScholarship } from "@/configs/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const scholarshipSlic = createSlice({
  name: "scholarship",
  initialState: {
    scholarships: [] as TScholarship[],
    pagination: {
      current_page: 1,
      last_page: 1,
    },
  },
  reducers: {
    setScholarships: (state, action) => {
      state.scholarships = action.payload.data;
      state.pagination = action.payload.pagination;
      return state;
    },
    addScholarship: (state, action: PayloadAction<TScholarship>) => {
      state.scholarships.unshift(action.payload);
      return state;
    },
    removeScholarship: (state, action: PayloadAction<number | string>) => {
      state.scholarships = state.scholarships.filter(
        (scholarship) => scholarship.id !== action.payload
      );
      return state;
    },
    updateScholarship: (state, action: PayloadAction<TScholarship>) => {
      state.scholarships = state.scholarships.map((scholarship) => {
        if (scholarship.id === action.payload.id) {
          return action.payload;
        }
        return scholarship;
      });
      return state;
    },
  },
});

export const {
  setScholarships,
  addScholarship,
  removeScholarship,
  updateScholarship,
} = scholarshipSlic.actions;
export default scholarshipSlic.reducer;
