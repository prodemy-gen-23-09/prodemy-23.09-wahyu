const Header = () => {
  return (
    <header className="navbar-container bg-white top-0 flex sticky py-3">
      <div className="flex items-center pl-10">
        <img
          src="./src/assets/ae-removebg-preview.png"
          alt="Logo"
          className="h-9"
        />
      </div>
      <nav className="flex items-center ml-auto pr-10">
        <ul className="flex">
          <li>
            <a
              href="#"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-hijau text-lg font-semibold px-4 py-2 no-underline transition duration-300 hover:text-black"
            >
              Cart
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;