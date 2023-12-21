import PropTypes from "prop-types";
// import { toRupiah } from "../utils/formatter";

function Product(props) {
  return (
    <div
      className="bg-[#f3f6f4] border border-[#f3f6f4] rounded-lg shadow-lg p-auto m-6 max-w-[200px] cursor-pointer"
      onClick={props.onClick}
    >
      <img src={props.image} alt={props.name} className="rounded-lg w-full" />
      <div className="py-3 pl-3">
        <h2 className="text-[18px] py-3">{props.name}</h2>
        {/* <p className="text-[14px] text-gray-700">{props.description}</p> */}
        {/* <p className="font-bold text-[#e44d26] pt-3">{toRupiah(props.price)}</p>
        <p className="text-[12px] text-gray-700 pt-2">
          Release on: {props.releaseOn && props.releaseOn.toLocaleDateString()}
        </p> */}
      </div>
    </div>
  );
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  releaseOn: PropTypes.instanceOf(Date),
};

export default Product;
