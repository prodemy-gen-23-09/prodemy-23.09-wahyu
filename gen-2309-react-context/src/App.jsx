import HomeWithSWR from "./pages/HomeWithSWR";
// import "/src/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
// import ProductDetails from "./pages/ProductDetails";
import Detail from "./pages/Detail";
// import InputProduct from "./pages/InputProduct";
// import Menu from "./pages/Menu";
// import ListProduct from "./pages/ListProduct";
// import UpdateProduct from "./pages/UpdateProduct";

import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import "/src/index.css";

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeWithSWR />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/inputProduct" element={<InputProduct />} />
          <Route path="/listProduct" element={<ListProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} /> */}
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
