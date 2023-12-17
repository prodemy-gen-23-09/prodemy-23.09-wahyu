import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setToken, setUser } from "../store/reducers/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).required(),
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
    axios
      .post("http://localhost:3000/login", data)
      .then((res) => {
        const { accessToken, user } = res.data;
        dispatch(setToken(accessToken));
        dispatch(setUser(user));
        navigate("/");
        reset();
      })
      .catch((error) => {
        console.log("Error:", error);
        if (error.response && error.response.status === 401) {
          alert("Invalid email or password. Please try again.");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="bg-white p-8 shadow-md rounded-md max-w-md"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="w-full p-3 border rounded-md"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-3 border rounded-md"
            type="password"
            id="password"
            placeholder="password"
            {...register("password")}
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Log in
        </button>
      </form>
    </div>
  );
}

export default Login;
