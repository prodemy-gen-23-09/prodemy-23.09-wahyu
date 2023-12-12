import Footer from "./layout/Footer";
import Header from "./layout/Header";
// import ProductDetails from "./pages/ProductDetails";
import Menu from "./pages/Menu";
// import "/src/App.css";
import "/src/index.css";

function App() {
  return (
    <div className="w-full">
      <Header />
      <Menu />
      {/* <ProductDetails /> */}
      <Footer />
    </div>
  );
}

export default App;
