import { Navigate, Route, Routes } from "react-router-dom";
import GeustRoutes from "./components/route/GuestRoutes";
import PrivateRoutes from "./components/route/PrivateRoutes";
import Layout from "./layout/Layout";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import HomeWithSWR from "./pages/HomeWithSWR";
import InputProduct from "./pages/InputProduct";
import ListProduct from "./pages/ListProduct";
import Login from "./pages/Login";
import UpdateProduct from "./pages/UpdateProduct";
import "/src/index.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<GeustRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/listProduct" element={<ListProduct />} />
        </Route>

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeWithSWR />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/inputProduct" element={<InputProduct />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
      </Routes>
    </Layout>
  );
}

export default App;
