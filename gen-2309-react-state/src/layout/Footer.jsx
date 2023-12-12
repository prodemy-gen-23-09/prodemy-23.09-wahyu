const Footer = () => {
  return (
    <footer className="bg-[#FAFAF9] text-black py-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <p className="text-sm">&copy; 2023 Prodemy 23.09</p>
        </div>
        <div className="flex">
          <ul className="flex justify-center list-none">
            <li className="mx-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1384/1384015.png"
                    alt="Instagram"
                    className="w-9 h-9"
                  />
                </div>
              </a>
            </li>
            <li className="mx-4">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3669/3669688.png"
                    alt="YouTube"
                    className="w-9 h-9"
                  />
                </div>
              </a>
            </li>
            <li className="mx-4">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1384/1384014.png"
                    alt="LinkedIn"
                    className="w-9 h-9"
                  />
                </div>
              </a>
            </li>
            <li className="mx-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png"
                    alt="Twitter"
                    className="w-9 h-9"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
