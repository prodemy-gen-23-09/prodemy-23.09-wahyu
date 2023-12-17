import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { toRupiah } from "../utils/formatter";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCart, setDataCart] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const { data, error } = useSWR(`http://localhost:3000/kopi/${id}`, fetcher);

  const [mainImage, setMainImage] = useState(data ? data.img : "");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const userId = user ? user.email : "";
        const response = await axios.get(
          `http://localhost:3000/cart?userId=${userId}`
        );
        setDataCart(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [user]);

  const incrementQty = () => setQuantity(quantity + 1);
  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity( quantity - 1);
    }
  };

  const handleThumbnailClick = (thumbnailUrl) => {
    setMainImage(thumbnailUrl);
  };

  const generateUniqueId = () => {
    return Date.now().toString();
  };

  const onClickAddToCart = async () => {
    try {
      const existingItem = dataCart.find(
        (item) =>
          item.name === data.name && item.userId === (user ? user.email : "")
      );

      if (existingItem) {
        existingItem.quantity += quantity;

        const response = await axios.put(
          `http://localhost:3000/cart/${existingItem.id}`,
          existingItem
        );

        console.log("Server Response:", response);
      } else {
        const payload = {
          ...data,
          quantity,
          userId: user ? user.email : "",
          id: generateUniqueId(),
        };

        const response = await axios.post(
          "http://localhost:3000/cart",
          payload
        );

        console.log("Server Response:", response);
      }

      navigate("/cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);

      if (error.response) {
        console.error("Server Error Response:", error.response.data);
      }
    }
  };

  if (!data && !error) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#38BDF8" />
      </div>
    );
  }

  if (error) {
    console.error("Error fetching product details:", error);
    return <p>Error fetching product details</p>;
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
                className="text-center bg-gray-300 w-20 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
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
              onClick={onClickAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
