import { TOffer } from "@/configs/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    offers: [] as TOffer[],
    pagination: {
      current_page: 1,
      last_page: 1,
    },
  },
  reducers: {
    setOffer: (state, action) => {
      state.offers = action.payload.data;
      state.pagination = action.payload.pagination;
      return state;
    },
    addOffer: (state, action) => {
      state.offers.unshift(action.payload);
      return state;
    },
    removeOffer: (state, action: PayloadAction<number | string>) => {
      state.offers = state.offers.filter(
        (offer) => offer.id !== action.payload
      );
      return state;
    },
    updateOffer: (state, action: PayloadAction<TOffer>) => {
      state.offers = state.offers.map((offer) => {
        if (offer.id === action.payload.id) {
          return action.payload;
        }
        return offer;
      });
      return state;
    },
  },
});

export const { setOffer, addOffer, removeOffer, updateOffer } =
  offerSlice.actions;
export default offerSlice.reducer;
