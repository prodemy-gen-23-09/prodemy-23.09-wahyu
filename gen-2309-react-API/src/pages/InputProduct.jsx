import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function InputProduct() {
  const schema = yup.object().shape({
    name: yup.string().required("Nama Produk Wajib diisi"),
    description: yup.string().required("Deskripsi Produk Wajib diisi"),
    price: yup
      .number()
      .required("Harga Produk Wajib diisi")
      .positive("Harga Harus Positif"),
    image: yup.string().url().required("gambar Produk Wajib diisi"),
    release: yup.date().required("Tanggal harus diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data) => {
    const releaseDate = new Date(data.release);
    const year = releaseDate.getFullYear();
    const month = (releaseDate.getMonth() + 1).toString().padStart(2, "0");
    const day = releaseDate.getDate().toString().padStart(2, "0");

    const formattedReleaseDate = `${year}-${month}-${day}`;

    // Buat payload dengan tanggal yang diformat
    const payload = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      releaseOn: formattedReleaseDate,
    };

    axios
      .post("http://localhost:3000/kopi", payload)
      .then(() => {
        alert("Product berhasil di Input");
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Input Product</h1>
      <div className="w-[600px]">
        <form
          className="flex flex-col gap-4 mx-auto mt-auto"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              placeholder="Name"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
              {...register("name")}
              id="name"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              placeholder="Description"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
              {...register("description")}
              id="description"
            />
            <p>{errors.description?.message}</p>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              placeholder="Price"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
              {...register("price")}
              id="price"
            />
            <p>{errors.price?.message}</p>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              placeholder="Image URL"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
              {...register("image")}
              id="image"
            />
            <p>{errors.image?.message}</p>
          </div>
          <div>
            <label htmlFor="release">Release Date</label>
            <input
              type="date"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
              {...register("release")}
              id="release"
            />
            <p>{errors.release?.message}</p>
          </div>
          <button
            className="rounded-lg bg-sky-400 p-2 text-white self-center w-full"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
}

export default InputProduct;
