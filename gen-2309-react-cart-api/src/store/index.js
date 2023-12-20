import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import cartSlice from "./reducers/cartSlice";
import checkoutSlice from "./reducers/checkoutSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    checkout: checkoutSlice,
  },
});

export default store;
