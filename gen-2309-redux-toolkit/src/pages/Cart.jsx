import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../store/reducers/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const handleDelete = (itemId) => {
    dispatch(deleteFromCart(itemId));
  };

  const { dataCart } = useSelector((state) => state.cart);

  return (
    <div className="px-[80px]">
      <h2 className="text-3xl font-bold mb-4 flex justify-center">My Cart</h2>
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-hijau text-white">
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataCart.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="px-4 py-2">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td className="px-4 py-2">{item.quantity}</td>
              <td className="px-4 py-2">{item.price * item.quantity}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline-red"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
