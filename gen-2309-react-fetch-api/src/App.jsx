import HomeWithSWR from "./pages/HomeWithSWR";
// import "/src/App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
// import ProductDetails from "./pages/ProductDetails";
import Detail from "./pages/Detail";
import "/src/index.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeWithSWR />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Layout>
  );
}

export default App;
