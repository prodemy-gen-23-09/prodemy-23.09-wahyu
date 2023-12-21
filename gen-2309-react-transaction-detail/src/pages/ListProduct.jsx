import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useSWR, { mutate } from "swr";
import { selectRole } from "../store/reducers/authSlice";

function ListProduct() {
  const navigate = useNavigate();
  const userRole = useSelector(selectRole);

  const { data } = useSWR("http://localhost:3000/kopi", (url) =>
    axios.get(url).then((res) => res.data)
  );

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3000/kopi/${productId}`)
      .then(() => {
        mutate("http://localhost:3000/kopi");
      })
      .catch((error) => console.log("Error deleting product:", error));
  };

  useEffect(() => {
    if (userRole !== "admin") {
      alert("Hanya admin yang dapat mengakses List Product.");
      navigate("/home");
    }
  }, [userRole, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 flex justify-center">
        Product List
      </h2>

      <button
        onClick={() => navigate("/inputProduct")}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Product
      </button>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Release Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-[100px]"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">{product.price}</td>
                <td className="py-2 px-4 border-b">{product.releaseOn}</td>
                <td className="">
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className="bg-blue-500 text-white p-2 rounded flex"
                  >
                    Update
                  </button>
                  <br />
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white p-2 rounded "
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

export default ListProduct;
