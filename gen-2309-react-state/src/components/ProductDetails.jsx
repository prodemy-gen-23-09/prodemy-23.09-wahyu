import { useState } from "react";

const ProductDetails = () => {
  const [images] = useState({
    img1: "https://static.fore.coffee/product/Nutty_Oat_Latte.jpeg",
    img2: "https://static.fore.coffee/product/doubleicedshaken173.jpg",
    img3: "https://static.fore.coffee/product/saltedcarameliced173.jpg",
    img4: "https://static.fore.coffee/product/salted-caramel173.jpg",
  });
  const [activeImg, setActiveImage] = useState(images.img1);

  const [amount, setAmount] = useState(1);

  return (
    <div className="flex flex-col justify-between lg:flex-row p-2 gap-10">
      <div className="flex flex-col gap-5 lg:w-1/3">
        <img
          src={activeImg}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="flex flex-row justify-center h-24 gap-4 lg:gap-10">
          <img
            src={images.img1}
            alt=""
            className="w-20 h-20 rounded-md"
            onClick={() => setActiveImage(images.img1)}
          />
          <img
            src={images.img2}
            alt=""
            className="w-20 h-20 rounded-md"
            onClick={() => setActiveImage(images.img2)}
          />
          <img
            src={images.img3}
            alt=""
            className="w-20 h-20 rounded-md"
            onClick={() => setActiveImage(images.img3)}
          />
          <img
            src={images.img4}
            alt=""
            className="w-20 h-20 rounded-md"
            onClick={() => setActiveImage(images.img4)}
          />
        </div>
      </div>
      {/* Deskripsi */}
      <div className="flex flex-col">
        <div>
          <h1 className="text-3xl font-bold"> Nutty Oat Latte </h1>
        </div>
        <p className="text-grey-600">
          Espresso dari biji kopi khas nusantara dipadukan susu oat gluten-free
          dan sensasi nutty dari hazelnut.
        </p>
        <h6 className="text-2xl font-semibold">Rp. 39.000</h6>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-1 px-4 rounded-lg text-hijau text-3xl"
              onClick={() => setAmount((prev) => prev - 1)}
            >
              -
            </button>
            <span className="py-3 px-4 rounded-lg">{amount}</span>
            <button
              className="bg-gray-200 py-1 px-3 rounded-lg text-hijau text-3xl"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="bg-hijau text-white font-semibold py-3 px-6 rounded-xl">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
