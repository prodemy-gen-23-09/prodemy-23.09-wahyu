import { ADD_CART, DELETE_ITEM } from "../types";

export const addToCart = (payload) => ({
  type: ADD_CART,
  payload,
});

export const removeFromCart = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});
