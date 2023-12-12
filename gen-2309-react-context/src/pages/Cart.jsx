import axios from "axios";
import { useContext, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { dataCart, setDataCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/cart")
      .then((response) => {
        setDataCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDataCart]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/cart/${id}`)
      .then((response) => {
        console.log("Item successfully deleted:", response.data);
        axios
          .get("http://localhost:3000/cart")
          .then((response) => {
            setDataCart(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!Array.isArray(dataCart)) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#38BDF8" />
      </div>
    );
  }

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
              <td className="px-4 py-2">{item.total}</td>
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
