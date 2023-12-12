import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [dataCart, setDataCart] = useState([]);

  const contextValue = {
    dataCart,
    setDataCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
