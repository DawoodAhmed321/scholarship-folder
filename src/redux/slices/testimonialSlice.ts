import { ITestimonial } from "@/configs/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [] as ITestimonial[],
    pagination: {
      current_page: 1,
      last_page: 1,
    },
  },
  reducers: {
    setTestimonials: (state, action) => {
      state.testimonials = action.payload.data;
      state.pagination = action.payload.pagination;
      return state;
    },
    addTestimonial: (state, action) => {
      state.testimonials.unshift(action.payload);
      return state;
    },
    updateTestimonial: (state, action: PayloadAction<ITestimonial>) => {
      state.testimonials = state.testimonials.map((testimonial) => {
        if (testimonial.id === action.payload.id) {
          return action.payload;
        }
        return testimonial;
      });
      return state;
    },
    removeTestimonial: (state, action: PayloadAction<number | string>) => {
      state.testimonials = state.testimonials.filter(
        (testimonial) => testimonial.id !== action.payload
      );
      return state;
    },
  },
});

export const {
  setTestimonials,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
} = testimonialSlice.actions;
export default testimonialSlice.reducer;
