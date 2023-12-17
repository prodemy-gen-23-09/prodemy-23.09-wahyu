import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Nama Produk Wajib diisi"),
    description: yup.string().required("Deskripsi Produk Wajib diisi"),
    price: yup
      .number()
      .required("Harga Produk Wajib diisi")
      .positive("Harga Harus Positif"),
    image: yup.string().url().required("Gambar Produk Wajib diisi"),
    release: yup.date().required("Tanggal harus diisi"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/kopi/${id}`);

        const { name, description, price, image, releaseOn } = res.data;

        setValue("name", name);
        setValue("description", description);
        setValue("price", price);
        setValue("image", image);
        setValue("release", new Date(releaseOn).toISOString().split("T")[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id, setValue]);

  const onSubmitForm = (product) => {
    const releaseDate = new Date(product.release);
    const year = releaseDate.getFullYear();
    const month = (releaseDate.getMonth() + 1).toString().padStart(2, "0");
    const day = releaseDate.getDate().toString().padStart(2, "0");

    const formattedReleaseDate = `${year}-${month}-${day}`;

    const payload = {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      releaseOn: formattedReleaseDate,
    };

    axios
      .put(`http://localhost:3000/kopi/${id}`, payload)
      .then(() => {
        alert("Product berhasil di Update");
        navigate("/listProduct");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold">Update Product</h1>
      <div className="w-[600px]">
        <form
          className="flex flex-col gap-4 mx-auto mt-auto"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div>
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              {...register("description")}
              type="text"
              placeholder="Description"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
            />
            <p>{errors.description?.message}</p>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              {...register("price")}
              type="number"
              placeholder="Price"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
            />
            <p>{errors.price?.message}</p>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              {...register("image")}
              type="text"
              placeholder="Image URL"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
            />
            <p>{errors.image?.message}</p>
          </div>
          <div>
            <label htmlFor="release">Release Date</label>
            <input
              {...register("release")}
              type="date"
              className="p-4 pe-12 w-full rounded-lg border-[1px] border-gray-300 text-gray-700 sm:text-sm"
            />
            <p>{errors.release?.message}</p>
          </div>
          <button
            className="rounded-lg bg-sky-400 p-2 text-white self-center w-full"
            type="submit"
          >
            Update Product
          </button>
        </form>
      </div>
    </section>
  );
}

export default UpdateProduct;
