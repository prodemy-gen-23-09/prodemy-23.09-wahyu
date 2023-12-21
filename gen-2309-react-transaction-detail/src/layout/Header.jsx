import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAuthData } from "../store/reducers/authSlice";
import Logo from "/src/assets/ae-removebg-preview.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.token !== "");

  const onClickLogout = () => {
    dispatch(resetAuthData());
    navigate("/login");
  };

  return (
    <header
      className={`w-full flex ${
        isLoggedIn ? "justify-between" : "justify-center"
      } py-4 px-10 border-b-[1px] border-gray-300 sticky top-0 bg-white z-10 mb-6`}
    >
      <div className="flex items-center pl-[80px]">
        <Link to="/home">
          <img src={Logo} alt="Logo" className="h-9" />
        </Link>
      </div>
      <nav className="flex items-center ml-auto pr-[80px]">
        <ul className="flex">
          <li>
            <Link
              to="/home"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/listProduct"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/transaction"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              Transaction
            </Link>
          </li>
        </ul>
      </nav>
      {isLoggedIn ? (
        <div
          className="self-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Hi, {user.username}
          {showDropdown && (
            <div
              className="rounded-lg drop-shadow-md absolute bg-white p-3"
              onClick={onClickLogout}
            >
              Logout
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            to="/login"
            className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
          >
            Daftar
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
