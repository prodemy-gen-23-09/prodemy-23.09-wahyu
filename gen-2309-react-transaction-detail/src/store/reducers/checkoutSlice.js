import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCheckout: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    checkoutProduct: (state, action) => {
      state.dataCheckout = action.payload;
    },
  },
});

export const { checkoutProduct } = checkoutSlice.actions;

export default checkoutSlice.reducer;
