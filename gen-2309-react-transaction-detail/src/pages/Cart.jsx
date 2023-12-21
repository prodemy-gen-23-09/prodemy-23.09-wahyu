import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { checkoutProduct } from "../store/reducers/checkoutSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const getCart = (url) => axios.get(url).then((response) => response.data);
  const { data, mutate } = useSWR(
    `http://localhost:3000/cart?userId=${user.id}`,
    getCart,
    {
      revalidateOnFocus: true,
    }
  );

  const [selectedItems, setSelectedItems] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/cart/${id}`)
      .then(() => {
        alert("Successfully delete product!");
        mutate();
      })
      .catch((error) => console.log(error));
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleCheckout = () => {
    const checkedItems = data?.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (!checkedItems || checkedItems.length === 0) {
      alert("Tidak ada item yang dipilih untuk checkout");
      return;
    }
    dispatch(checkoutProduct(checkedItems));
    navigate("/checkout");
  };

  return (
    <div className="px-[80px]">
      <h2 className="text-3xl font-bold mb-4 flex justify-center">My Cart</h2>
      <table className="min-w-full border rounded-lg overflow-hidden">
        <thead className="bg-hijau text-white">
          <tr>
            <th className="px-4 py-2">Select</th>
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
          {data?.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </td>
              <td className="px-4 py-2">
                <img
                  src={item.image || ""}
                  alt={item.name || ""}
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
                <div className="flex justify-end mt-4"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCheckout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
