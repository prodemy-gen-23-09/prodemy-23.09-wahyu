import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { selectRole } from "../store/reducers/authSlice";
import { formatDate } from "../utils/formatter";

function TransactionPage() {
  const navigate = useNavigate();
  const userRole = useSelector(selectRole);

  const authData = useSelector((state) => state.auth);
  const userId = authData.user.id;
  const isAdmin = authData.user.role === "admin";

  const apiUrl =
    userRole === "admin"
      ? "http://localhost:3000/transaction"
      : `http://localhost:3000/transaction?userId=${userId}`;

  const { data, isLoading } = useSWR(apiUrl, (url) =>
    axios.get(url).then((res) => res.data)
  );

  const handleCardClick = (transactionId) => {
    navigate(`/transaction/${transactionId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#38BDF8" />
      </div>
    );
  }

  console.log("UserRole:", userRole);
  console.log("UserID:", userId);

  return (
    <div className="max-w-screen-lg mx-auto mt-8 grid grid-cols-1">
      {/* List Transaksi */}
      {data
        .filter((transaction) => {
          const isTransactionUser = transaction.products.some(
            (product) => product.userId === userId
          );
          return isAdmin || isTransactionUser;
        })
        .map((transaction) => (
          <div
            key={transaction.id}
            className="bg-neutral-200 p-6 rounded-md shadow-lg cursor-pointer mb-4"
            onClick={() => handleCardClick(transaction.id)}
          >
            <p className="text-gray-900 font-semibold">
              Tangal Pembelian: {formatDate(transaction.date)}
            </p>

            {/* Nama Produk dan Total Belanja */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {transaction.products.map((product, index) => (
                <div key={index} className="p-2 flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-md"
                  />
                  <span className=" ml-3">
                    <p className="text-gray-700 font-semibold">
                      {product.name}
                    </p>
                    <p className="text-gray-400">{product.quantity} barang</p>
                  </span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 font-extrabold ">
              Total Belanja: {transaction.subtotal}
            </p>
          </div>
        ))}
    </div>
  );
}

export default TransactionPage;
