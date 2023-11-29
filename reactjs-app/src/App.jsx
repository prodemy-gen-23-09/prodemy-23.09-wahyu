import "./app.css";
import ProductCard from "./components/Product";

function App() {
  const products = [
    {
      id: 1,
      name: "Nutty Oat Latte",
      description:
        "Espresso dari biji kopi khas nusantara dipadukan susu oat gluten-free dan sensasi nutty dari hazelnut.",
      price: 39000,
      imageUrl: "https://static.fore.coffee/product/Nutty_Oat_Latte.jpeg",
    },
    {
      id: 2,
      name: "Double Iced Shaken Latte",
      description: "Paduan klasik 2 shot espresso dengan susu dan krim",
      price: 33000,
      imageUrl: "https://static.fore.coffee/product/doubleicedshaken173.jpg",
    },
    {
      id: 3,
      name: "Iced Salted Caramel Mocha",
      description:
        "Perpaduan coklat, latte dari house blend Fore, dan gurihnya caramel",
      price: 33000,
      imageUrl: "https://static.fore.coffee/product/saltedcarameliced173.jpg",
    },
    {
      id: 4,
      name: "Hot Salted Caramel Mocha",
      description:
        "Perpaduan coklat, latte dari house blend Fore, dan gurihnya caramel",
      price: 33000,
      imageUrl: "https://static.fore.coffee/product/salted-caramel173.jpg",
    },
    {
      id: 5,
      name: "Iced Americano Coldplay",
      description:
        "Espresso shot dalam segelas air dengan menjaga ketebalan rasa kopinya",
      price: 24000,
      imageUrl: "https://static.fore.coffee/product/americanoiced173.jpg",
    },
  ];

  return (
    <div className="container">
      <h1 className="app-title">Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default App;
