import { ADD_CART, DELETE_ITEM } from "../types";

const initialState = {
  dataCart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART: {
      const newItem = action.payload;
      const existingItem = state.dataCart.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        return {
          ...state,
          dataCart: state.dataCart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          dataCart: [...state.dataCart, { ...newItem }],
        };
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        dataCart: state.dataCart.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
