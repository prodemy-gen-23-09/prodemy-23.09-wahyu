import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { toRupiah } from "../utils/formatter";

function Checkout() {
  const navigate = useNavigate();

  const { dataCheckout } = useSelector((state) => state.checkout);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    alamat: yup.string().required("alamat is required"),
    delivery: yup.string().required("Delivery method is required"),
    wrap: yup.boolean(),
    payment: yup.string().required("Payment Method is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = async (data) => {
    console.log("Form submitted with data:", data);
    const products = dataCheckout.map((item) => ({
      name: item.name,
      price: toRupiah(item.price),
      quantity: item.quantity,
      total: toRupiah(item.quantity * item.price),
    }));

    const payload = {
      name: data.name,
      email: data.email,
      alamat: data.alamat,
      delivery: data.delivery,
      payment: data.payment,
      wrap: data.wrap,
      // products: dataCheckout,

      products: products,
      total: toRupiah(
        dataCheckout.reduce((acc, item) => acc + item.quantity * item.price, 0)
      ),
    };

    axios
      .post("http://localhost:3000/transaction", payload)
      .then(() => {
        alert("Successfully made a new transaction!");
        reset();
        navigate("/cart");
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className="px-20">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-semibold my-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <div>
                <label htmlFor="name" className="text-gray-600 text-sm">
                  Name
                </label>
                <input
                  placeholder="Name"
                  className="w-full rounded-lg border p-3 text-sm focus:outline-sky-200"
                  {...register("name")}
                  id="name"
                />
                <p className="text-red-500 text-xs">{errors.name?.message}</p>
              </div>

              <div>
                <label htmlFor="email" className="text-gray-600 text-sm">
                  Email
                </label>
                <input
                  placeholder="Email"
                  className="w-full rounded-lg border p-3 text-sm focus:outline-sky-200"
                  {...register("email")}
                  id="email"
                />
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              </div>

              <div>
                <label htmlFor="alamat" className="text-gray-600 text-sm">
                  Alamat
                </label>
                <input
                  placeholder="alamat"
                  className="w-full rounded-lg border p-3 text-sm focus:outline-sky-200"
                  {...register("alamat")}
                  id="alamat"
                />
                <p className="text-red-500 text-xs">{errors.city?.message}</p>
              </div>

              <div className="flex gap-8">
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="deliverySameDay"
                    {...register("delivery")}
                    value="JNP Same Day"
                    className="form-radio"
                  />
                  <label htmlFor="deliverySameDay" className="text-sm">
                    JNP Same Day
                  </label>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    id="deliveryExpress"
                    {...register("delivery")}
                    value="J&P Express"
                    className="form-radio"
                  />
                  <label htmlFor="deliveryExpress" className="text-sm">
                    J&P Express
                  </label>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  {...register("wrap")}
                  id="wrap"
                  className="form-checkbox"
                />
                <label htmlFor="wrap" className="text-sm">
                  Extra Wrap
                </label>
              </div>

              <div className="flex gap-2">
                <select
                  className="p-3 w-full rounded-lg border text-gray-700 text-sm focus:outline-sky-200"
                  {...register("payment")}
                  id="payment"
                >
                  <option value="">Please select</option>
                  <option value="Mobile Banking">Mobile Banking</option>
                  <option value="E-Wallet">E-Wallet</option>
                </select>
                <label htmlFor="payment" className="text-gray-600 text-sm">
                  Payment Method
                </label>
                <p className="text-red-500 text-xs">
                  {errors.payment?.message}
                </p>
              </div>

              <button
                className="rounded-lg bg-sky-400 p-3 text-white self-center w-full hover:bg-sky-500"
                type="submit"
              >
                Purchase
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
            {dataCheckout.map((item, index) => (
              <div key={index} className="flex justify-between my-4">
                <img src={item.image} alt="foto" className="w-16" />
                <h3 className="font-bold">{item.name}</h3>
                <span>{item.quantity}</span>
                <span>{toRupiah(item.price)}</span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between mt-4">
              <span className="font-bold">Total</span>
              <span className="font-bold">
                {toRupiah(
                  dataCheckout.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
