import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoutes from "./components/route/GuestRoutes";
import PrivateRoutes from "./components/route/PrivateRoutes";
import Layout from "./layout/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import DetailProduct from "./pages/DetailProduct";
import HomeWithSWR from "./pages/HomeWithSWR";
import InputProduct from "./pages/InputProduct";
import ListProduct from "./pages/ListProduct";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UpdateProduct from "./pages/UpdateProduct";
import "/src/index.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<GuestRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/listProduct" element={<ListProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/inputProduct" element={<InputProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        <Route path="register" element={<Registration />} />
        <Route path="/detail/:id" element={<DetailProduct />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeWithSWR />} />
      </Routes>
    </Layout>
  );
}

export default App;
