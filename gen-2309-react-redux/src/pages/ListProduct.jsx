import axios from "axios";
import { useNavigate } from "react-router";
import useSWR, { mutate } from "swr";

function ListProduct() {
  const navigate = useNavigate();
  const { data: products } = useSWR("http://localhost:3000/product", (url) =>
    axios.get(url).then((res) => res.data)
  );

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:3000/product/${productId}`)
      .then(() => {
        mutate("http://localhost:3000/product");
      })
      .catch((error) => console.log("Error deleting product:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
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
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="max-w-[100px]"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.productName}</td>
                <td className="py-2 px-4 border-b">
                  {product.productDescription}
                </td>
                <td className="py-2 px-4 border-b">{product.productPrice}</td>
                <td className="py-2 px-4 border-b">{product.productRelease}</td>
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
