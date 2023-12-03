import ProductCard from "./Product";

function Menu() {
  const products = [
    {
      id: 1,
      name: "Nutty Oat Latte",
      description:
        "Espresso dari biji kopi khas nusantara dipadukan susu oat gluten-free dan sensasi nutty dari hazelnut.",
      price: 39000,
      imageUrl: "https://static.fore.coffee/product/Nutty_Oat_Latte.jpeg",
    },
    {
      id: 2,
      name: "Double Iced Shaken Latte",
      description: "Paduan klasik 2 shot espresso dengan susu dan krim",
      price: 33000,
      imageUrl: "https://static.fore.coffee/product/doubleicedshaken173.jpg",
    },
    {
      id: 3,
      name: "Iced Salted Caramel Mocha",
      description:
        "Perpaduan coklat, latte dari house blend Fore, dan gurihnya caramel",
      price: 33000,
      imageUrl: "https://static.fore.coffee/product/saltedcarameliced173.jpg",
    },
    {
      id: 4,
      name: "Hot Salted Caramel Mocha",
      description:
        "Perpaduan coklat, latte dari house blend Fore, dan gurihnya caramel",
      price: 33000,
      imageUrl: "https://static.fore.coffee/product/salted-caramel173.jpg",
    },
    {
      id: 5,
      name: "Iced Americano Coldplay",
      description:
        "Espresso shot dalam segelas air dengan menjaga ketebalan rasa kopinya",
      price: 24000,
      imageUrl: "https://static.fore.coffee/product/americanoiced173.jpg",
    },
    {
      id: 6,
      name: "Iced Americano Coldplay",
      description:
        "Espresso shot dalam segelas air dengan menjaga ketebalan rasa kopinya",
      price: 24000,
      imageUrl: "https://static.fore.coffee/product/americanoiced173.jpg",
    },
  ];

  return (
    <div>
      <div className="relative bg-center bg-no-repeat text-hijau h-[200px]">
        <img
          src="https://fore.coffee/wp-content/uploads/2023/10/Frame-48096650-1024x202.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[50px] font-extrabold">MENU</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
