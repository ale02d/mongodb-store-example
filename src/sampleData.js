export const LAPTOP_NAME = "Portatil Pro 14";
export const SHIRT_NAME = "Camiseta basica";
export const BOOK_NAME = "Narnia";

export const SAMPLE_PRODUCTS = [
  {
    name: LAPTOP_NAME,
    category: "tecnologia",
    price: 3200000,
    stock: 8,
    specs: { ram_Gb: 16, cpu: "8 nucleos", screen: "14 pulgadas" },
  },
  {
    name: SHIRT_NAME,
    category: "ropa",
    price: 45000,
    stock: 120,
    sizes: ["S", "M", "L"],
    colors: ["negro", "blanco"],
  },
  {
    name: BOOK_NAME,
    category: "libros",
    price: 58000,
    stock: 30,
    author: "C.S. Lewis",
    reviews: [{ user: "ana", stars: 5 }],
  },
];
