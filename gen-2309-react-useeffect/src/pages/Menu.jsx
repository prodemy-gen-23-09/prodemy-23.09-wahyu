import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/Product";

function Menu() {
  const initialProducts = useMemo(
    () => [
      {
        id: 1,
        name: "Nutty Oat Latte",
        description:
          "Espresso dari biji kopi khas nusantara dipadukan susu oat gluten-free dan sensasi nutty dari hazelnut.",
        price: 39000,
        imageUrl: "https://static.fore.coffee/product/Nutty_Oat_Latte.jpeg",
        updatedAt: new Date("2023-11-01"),
      },
      {
        id: 2,
        name: "Double Iced Shaken Latte",
        description: "Paduan klasik 2 shot espresso dengan susu dan krim",
        price: 33000,
        imageUrl: "https://static.fore.coffee/product/doubleicedshaken173.jpg",
        updatedAt: new Date("2023-11-01"),
      },
      {
        id: 3,
        name: "Iced Salted Caramel Mocha",
        description:
          "Perpaduan coklat, latte dari house blend Fore, dan gurihnya caramel",
        price: 30000,
        imageUrl: "https://static.fore.coffee/product/saltedcarameliced173.jpg",
        updatedAt: new Date("2023-11-11"),
      },
      {
        id: 4,
        name: "Hot Salted Caramel Mocha",
        description:
          "Perpaduan coklat, latte dari house blend Fore, dan gurihnya caramel",
        price: 31000,
        imageUrl: "https://static.fore.coffee/product/salted-caramel173.jpg",
        updatedAt: new Date("2023-11-21"),
      },
      {
        id: 5,
        name: "Iced Americano Coldplay",
        description:
          "Espresso shot dalam segelas air dengan menjaga ketebalan rasa kopinya",
        price: 24000,
        imageUrl: "https://static.fore.coffee/product/americanoiced173.jpg",
        updatedAt: new Date("2023-11-31"),
      },
      {
        id: 6,
        name: "Iced Americano Coldplay",
        description:
          "Espresso shot dalam segelas air dengan menjaga ketebalan rasa kopinya",
        price: 25000,
        imageUrl: "https://static.fore.coffee/product/americanoiced173.jpg",
        updatedAt: new Date("2023-10-01"),
      },
    ],
    []
  );

  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [sortCriteria, setSortCriteria] = useState("terbaru");

  useEffect(() => {
    const sortProducts = () => {
      switch (sortCriteria) {
        case "harga-tinggi":
          setFilteredProducts(
            [...initialProducts].sort((a, b) => b.price - a.price)
          );
          break;
        case "harga-rendah":
          setFilteredProducts(
            [...initialProducts].sort((a, b) => a.price - b.price)
          );
          break;
        case "terbaru":
          setFilteredProducts(
            [...initialProducts].sort((a, b) => b.updatedAt - a.updatedAt)
          );
          break;
        case "terlama":
          setFilteredProducts(
            [...initialProducts].sort((a, b) => a.updatedAt - b.updatedAt)
          );
          break;
        default:
          setFilteredProducts([...initialProducts]);
      }
    };

    sortProducts();
  }, [sortCriteria, initialProducts]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  return (
    <div>
      <div className="relative bg-center bg-no-repeat text-hijau h-[200px]">
        <img
          src="https://fore.coffee/wp-content/uploads/2023/10/Frame-48096650-1024x202.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[50px] font-extrabold">MENU</h1>
        </div>
      </div>
      <div className="flex space-x-4 justify-center mt-5">
        <button
          onClick={() => handleSortChange("harga-tinggi")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Harga Tertinggi
        </button>
        <button
          onClick={() => handleSortChange("harga-rendah")}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-hijau"
        >
          Harga Terendah
        </button>
        <button
          onClick={() => handleSortChange("terbaru")}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Terbaru
        </button>
        <button
          onClick={() => handleSortChange("terlama")}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Terlama
        </button>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
