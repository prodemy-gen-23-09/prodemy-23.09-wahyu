import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { initialProducts } from "../Data/kopi";
import ProductCard from "../components/Product";

function Menu() {
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
  }, [sortCriteria]);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const navigate = useNavigate();
  const onClickCard = (id) => {
    navigate(`/detail/${id}`);
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
        {filteredProducts.map(
          ({ id, name, description, img, price, releaseOn }) => (
            <ProductCard
              key={id}
              name={name}
              description={description}
              price={price}
              image={img}
              releaseOn={releaseOn}
              onClick={() => onClickCard(id)}
            />
          )
        )}
      </div>
    </div>
  );
}

export default Menu;
