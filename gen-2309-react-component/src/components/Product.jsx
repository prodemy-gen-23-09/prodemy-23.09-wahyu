import PropTypes from "prop-types";
import "/src/index.css";

function ProductCard(props) {
  return (
    <div className="bg-[#f3f6f4] border border-[#f3f6f4] rounded-lg shadow-lg p-auto m-6 max-w-[200px]">
      <img
        src={props.imageUrl}
        alt={props.name}
        className="rounded-lg w-full"
      />
      <div className="py-3 pl-3">
        <h2 className="text-[18px] py-3">{props.name}</h2>
        <p className="text-[14px] text-gray-700">{props.description}</p>
        <p className="font-bold text-[#e44d26] pt-3">Rp.{props.price}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
export default ProductCard;
