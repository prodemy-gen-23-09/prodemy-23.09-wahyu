import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.dataCart.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.dataCart.push({ ...newItem });
      }
    },
    deleteFromCart: (state, action) => {
      state.dataCart = state.dataCart.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addToCart, deleteFromCart, clearSelectedItems } =
  cartSlice.actions;
export default cartSlice.reducer;
