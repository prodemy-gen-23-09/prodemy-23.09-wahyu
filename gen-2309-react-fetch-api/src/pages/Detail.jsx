import { useState } from "react";
import { useParams } from "react-router-dom";
import { initialProducts } from "../Data/kopi";

const DetailPage = () => {
  const { id } = useParams();
  const product = initialProducts.find((p) => p.id === parseInt(id, 10));

  const [mainImage, setMainImage] = useState(product.img);
  const [quantity, setQuantity] = useState(1);

  const handleThumbnailClick = (thumbnailUrl) => {
    setMainImage(thumbnailUrl);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col justify-between lg:flex-row p-5 gap-10">
      <div className="flex flex-col gap-3 lg:w-[35%]">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="flex justify-start w-3/4 gap-9">
          <img
            src={product.img}
            alt="Thumbnail 1"
            className="w-1/4 h-auto cursor-pointer rounded-xl"
            onClick={() => handleThumbnailClick(product.img)}
          />

          {product.thumbnails.map((thumbnail, index) => (
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
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <h6 className="text-2xl font-semibold mb-4">Rp. {product.price}</h6>
        <div className="flex items-center gap-12">
          <div className="flex items-center">
            <button
              className="bg-gray-200 py-1 px-4 rounded-lg text-hijau text-3xl"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="py-3 px-4 rounded-lg">{quantity}</span>
            <button
              className="bg-gray-200 py-1 px-3 rounded-lg text-hijau text-3xl"
              onClick={() => handleQuantityChange(quantity + 1)}
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

export default DetailPage;
