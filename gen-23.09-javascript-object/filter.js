const menu = [
  {
    name: "Hot Coffee",
    catagory: "coffee",
    price: 15000,
    stok: 50,
  },

  {
    name: "Hot Espresso",
    catagory: "coffee",
    price: 25000,
    stok: 20,
  },

  {
    name: "Green Tea Blended Creame",
    catagory: "tea",
    price: 13000,
    stok: 100,
  },

  {
    name: "Banana Bites",
    catagory: "snack",
    price: 9000,
    stok: 100,
  },
  {
    name: "Chocolate Grande",
    catagory: "chocolate",
    price: 19000,
    stok: 75,
  },

  {
    name: "BBQ Chicken Wings",
    catagory: "snack",
    price: 13000,
    stok: 20,
  },
];

// const snackmenu = menu.filter((menu) => menu.catagory === "snack");
// console.log(snackmenu);

// const filterStok = menu.filter((menu) => menu.stok > 20);
// console.log(filterStok);

// const nonCoffee = menu.filter((menu) => menu.catagory != "coffee");
// console.log(nonCoffee);

const a = menu[0];
a.stok = 75;
// console.log(menu[0]);

// Melakukan filter "coffee"
const coffeemenu = menu
  .filter((menu) => menu.catagory === "coffee")
  .map((menu) => menu.name);
console.log(coffeemenu);

// Manipulasi Data (menambah data menggunakan forEach)
// menu.forEach((menu) => {
//   menu["keterangan"] = "Stok Banyak";
//   if (menu.stok <= 50) {
//     menu["keterangan"] = "Stok Sedikit";
//   }
//   // if (menu.stok <= 25) {
//   //   menu["keterangan"] = "Stok sedikit";
//   // }
// });

// console.log(menu);
