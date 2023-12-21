import axios from "axios";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import { formatDate, toRupiah } from "../utils/formatter";

function TransactionDetailPage() {
  const { id } = useParams();

  const { data: transaction, isLoading } = useSWR(
    `http://localhost:3000/transaction/${id}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <BeatLoader color="#38BDF8" />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Detail Transaksi</h1>
      <p className="text-gray-600 mt-2">
        <span className="font-semibold">Tanggal Pembelian:</span>{" "}
        {formatDate(transaction.date)}
      </p>

      {/* Detail Produk */}
      <div className="bg-white p-8 rounded-md shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Detail Produk</h2>

        <ul className="list-disc pl-4">
          {transaction.products.map((product, index) => (
            <li key={index} className="text-gray-600 flex items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-30 mr-2 my-2"
              />
              <span>
                {product.name} - {product.quantity} x {toRupiah(product.price)}{" "}
                = {toRupiah(product.quantity * product.price)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          <span className="font-semibold">Total:</span> {transaction.subtotal}
        </p>
      </div>

      {/* Info Pengiriman */}
      <div className="bg-white p-8 rounded-md shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Info Pengiriman</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Name:</span> {transaction.name}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {transaction.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Alamat:</span> {transaction.alamat}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Delivery:</span>{" "}
          {transaction.delivery}
        </p>
      </div>

      {/* Rincian Pembayaran */}
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Rincian Pembayaran</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Payment:</span> {transaction.payment}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Subtotal:</span>{" "}
          {transaction.subtotal}
        </p>
      </div>
    </div>
  );
}

export default TransactionDetailPage;
