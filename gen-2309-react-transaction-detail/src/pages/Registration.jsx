import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

function Registration() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(5).max(32).required("Password is required"),
    username: yup.string().required("Username is required"),
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
    const payload = {
      email: data.email,
      password: data.password,
      username: data.username,
      role: "user",
    };

    axios
      .get(
        `http://localhost:3000/users?email=${data.email}&username=${data.username}`
      )
      .then((existingUser) => {
        if (existingUser.data.length > 0) {
          alert(
            "Email or Username is already registered. Please use different email or username."
          );
        } else {
          axios
            .post("http://localhost:3000/users", payload)
            .then(() => {
              alert("Successfully registered!");
              reset();
              navigate("/login");
            })
            .catch((error) => {
              console.error("Registration failed:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className=" max-w-md mx-auto">
      <form
        className="bg-black p-8 shadow-md rounded-md max-w-md"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h1 className="text-center font-bold text-2xl mb-4 text-gray-300">
          Registration
        </h1>

        <div className="mb-4 text-gray-300">
          <label htmlFor="username" className="text-sm">
            Username
          </label>
          <input
            placeholder="Username"
            className="w-full rounded-lg border-[1px] border-gray-200 p-4 text-sm focus:outline-sky-200 text-black"
            {...register("username")}
            id="username"
          />
          <p className="text-red-500 mt-1">{errors.username?.message}</p>
        </div>

        <div className="mb-4 text-gray-300 ">
          <label htmlFor="email" className="text-sm ">
            Email
          </label>
          <input
            placeholder="Email"
            className="w-full rounded-lg border-[1px] border-gray-200 p-4 text-sm focus:outline-sky-200 text-black"
            {...register("email")}
            id="email"
          />
          <p className="text-red-500 mt-1">{errors.email?.message}</p>
        </div>

        <div className="mb-4 text-gray-300">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            placeholder="Password"
            className="w-full rounded-lg border-[1px] border-gray-200 p-4 text-sm focus:outline-sky-200 text-black"
            {...register("password")}
            id="password"
            type="password"
          />
          <p className="text-red-500 mt-1">{errors.password?.message}</p>
        </div>

        <button
          className="rounded-lg bg-blue-500 py-2 text-white w-full"
          type="submit"
        >
          Register
        </button>
        <p className="text-center mt-2 text-sm text-gray-300">
          Sudah Punya Akun?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline hover:text-blue-900"
          >
            Login Disini
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
