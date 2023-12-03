import Footer from "../src/components/Footer";
import Header from "./components/Header";
// import Menu from "./components/Menu";
import ProductDetails from "./components/ProductDetails";
// import "/src/App.css";
import "/src/index.css";

function App() {
  return (
    <div className="w-full">
      <Header />
      {/* <Menu /> */}
      <ProductDetails />
      <Footer />
    </div>
  );
}

export default App;
