import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { addToCart } from "../store/actions/addToCart";
import { toRupiah } from "../utils/formatter";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: productDetail, isLoading } = useSWR(
    `http://localhost:3000/kopi/${id}`,
    fetcher
  );

  const onClickAddToCart = () => {
    const payload = {
      ...productDetail,
      quantity,
    };

    dispatch(addToCart(payload));
    navigate("/cart");
  };

  const [mainImage, setMainImage] = useState(
    productDetail ? productDetail.img : ""
  );

  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => setQuantity(quantity + 1);
  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (thumbnailUrl) => {
    setMainImage(thumbnailUrl);
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
          src={mainImage || productDetail.img || ""}
          alt={productDetail.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="flex justify-start w-3/4 gap-9">
          <img
            src={productDetail.img}
            alt="Thumbnail 1"
            className="w-1/4 h-auto cursor-pointer rounded-xl"
            onClick={() => handleThumbnailClick(productDetail.img)}
          />

          {productDetail.thumbnails &&
            productDetail.thumbnails.map((thumbnail, index) => (
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
        <h1 className="text-3xl font-bold mb-4">{productDetail.name}</h1>
        <p className="text-gray-600 mb-4">{productDetail.description}</p>
        <h6 className="text-2xl font-semibold mb-4">
          {toRupiah(productDetail.price)}
        </h6>
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <div className="flex flex-row h-10 rounded-lg bg-transparent mt-1">
              <button
                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-10 rounded-l cursor-pointer outline-none text-2xl font-thin"
                onClick={decrementQty}
              >
                −
              </button>
              <input
                type="number"
                className="focus:outline-none text-center bg-gray-300 w-20 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
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
