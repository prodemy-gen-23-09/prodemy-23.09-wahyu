import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { toRupiah } from "../utils/formatter";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const { data, isLoading } = useSWR(
    `http://localhost:3000/kopi/${id}`,
    fetcher
  );

  const [mainImage, setMainImage] = useState(data ? data.img : "");
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => setQuantity(quantity + 1);
  const decrementQty = () => setQuantity(Math.max(1, quantity - 1));

  const handleThumbnailClick = (thumbnailUrl) => {
    setMainImage(thumbnailUrl);
  };

  const addToCart = () => {
    if (!data) return;

    axios
      .get(`http://localhost:3000/cart?id=${data.id}&&userId=${user.id}`)
      .then((response) => {
        const existingProduct = response.data;

        if (existingProduct.length > 0) {
          const updatedQuantity = existingProduct[0].quantity + quantity;

          return axios.put(
            `http://localhost:3000/cart/${existingProduct[0].id}`,
            {
              ...data,
              userId: user.id,
              quantity: updatedQuantity,
            }
          );
        } else {
          const payload = {
            ...data,
            userId: user.id,
            quantity,
          };

          return axios.post("http://localhost:3000/cart", payload);
        }
      })
      .then(() => {
        navigate("/cart");
        alert("Cart updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating/add to cart:", error);
        alert(
          "Failed to update/add product to the cart. Please try again later."
        );
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#38BDF8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between lg:flex-row p-5 gap-10">
      <div className="flex flex-col gap-3 lg:w-[35%]">
        <img
          src={mainImage || data.image || ""}
          alt={data.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="flex justify-start w-3/4 gap-9">
          <img
            src={data.image}
            alt="Thumbnail 1"
            className="w-1/4 h-auto cursor-pointer rounded-xl"
            onClick={() => handleThumbnailClick(data.image)}
          />

          {data.thumbnails &&
            data.thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="w-1/4 h-auto cursor-pointer rounded-xl"
                onClick={() => handleThumbnailClick(thumbnail)}
              />
            ))}
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <p className="text-gray-600 mb-4">{data.description}</p>
        <h6 className="text-2xl font-semibold mb-4">{toRupiah(data.price)}</h6>
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <div className="flex flex-row h-10 rounded-lg bg-transparent mt-1 mr-4">
              <button
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none text-2xl font-thin"
                onClick={decrementQty}
              >
                −
              </button>
              <input
                type="number"
                className="text-center bg-gray-300 w-20 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
                name="Quantity"
                value={quantity}
                disabled
              />
              <button
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-r cursor-pointer text-2xl font-thin"
                onClick={incrementQty}
              >
                +
              </button>
            </div>
            <button
              className="bg-hijau text-white font-semibold py-3 px-6 rounded-xl"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl"
              onClick={onClickBuyNow}
            >
              Buy Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
