import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type IModalSlice = {
  view:
    | ""
    | "NEW_OFFER"
    | "EDIT_OFFER"
    | "NEW_SCHOLARSHIP"
    | "EDIT_SCHOLARSHIP"
    | "NEW_TESTIMONIAL"
    | "EDIT_TESTIMONIAL"
    | "CONFIRM_MODAL";
  data: any;
};

const modalSlice = createSlice({
  name: "model",
  initialState: {
    view: "",
    data: null,
  } as IModalSlice,
  reducers: {
    openModal(state, action: PayloadAction<IModalSlice>) {
      state = action.payload;
      return state;
    },

    closeModal(state) {
      state = {
        view: "",
        data: null,
      };
      return state;
    },
    setModalData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
});

export const { openModal, closeModal, setModalData } = modalSlice.actions;
export default modalSlice.reducer;
