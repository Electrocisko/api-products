import { pool } from "../postgres.js";


const data2 = [
  {
    name: "T-shirt with Tape Details",
    price: 120,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    discount: 0,
    style: "casual",
    branch: "chemea",
    gender: "uni",
    imageurl: "tape_details_tshirt.png",
  },
  {
    name: "Skinny Fit Jeans",
    price: 260,
    description: "Here is the description of the product.....",
    discount: 20,
    style: "casual",
    branch: "wrangler",
    gender: "uni",
    imageurl: "skinny_fit_jeans.png",
  },
  {
    name: "Checkered Shirt",
    price: 180,
    description: "Here is the description of the product.....",
    discount: 0,
    style: "casual",
    branch: "adidas",
    gender: "men",
    imageurl: "chekered_shirt.png",
  },
  {
    name: "Sleeve Striped T-shirt",
    price: 160,
    description: "Here is the description of the product.....",
    discount: 30,
    style: "casual",
    branch: "nike",
    gender: "women",
    imageurl: "striped_tshirt.png",
  },
  {
    name: "Vertical Striped Shirt",
    price: 232,
    description: "Here is the description of the product.....",
    discount: 20,
    style: "casual",
    branch: "chemea",
    gender: "women",
    imageurl: "striped_tshirt-2.png",
  },
  {
    name: "Courage Graphic T-shirt",
    price: 145,
    description: "Here is the description of the product.....",
    discount: 0,
    style: "casual",
    branch: "adidas",
    gender: "men",
    imageurl: "graphic_tshirt.png",
  },
  {
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    description: "Here is the description of the product.....",
    discount: 0,
    style: "casual",
    branch: "zara",
    gender: "women",
    imageurl: "bermuda_short.png",
  },
  {
    name: "Faded Skinny Jeans",
    price: 210,
    description: "Here is the description of the product.....",
    discount: 0,
    style: "casual",
    branch: "dia",
    gender: "women",
    imageurl: "faded_jeans.png",
  },
  {
    name: "One Life Graphic T-shirt",
    price: 300,
    description: "Here is the description of the product.....",
    discount: 40,
    style: "casual",
    branch: "chispita",
    gender: "men",
    imageurl: "on_life_tshirt.png",
  },
  {
    name: "Polo with Contrast Trims",
    price: 242,
    description: "Here is the description of the product.....",
    discount: 20,
    style: "casual",
    branch: "generica",
    gender: "men",
    imageurl: "contrast-trim_tshirt.png",
  },
  {
    name: "Gradient Graphic T-shirt",
    price: 145,
    description: "Here is the description of the product.....",
    discount: 0,
    style: "casual",
    branch: "wrangler",
    gender: "women",
    imageurl: "gradient_tshirt.png",
  },
  {
    name: "Polo with Tipping Details",
    price: 180,
    description: "Here is the description of the product.....",
    discount: 0,
    style: "casual",
    branch: "zara",
    gender: "men",
    imageurl: "polo_tshirt.png",
  },
  {
    name: "Black Striped T-shirt",
    price: 150,
    description: "Here is the description of the product.....",
    discount: 30,
    style: "casual",
    branch: "nike",
    gender: "men",
    imageurl: "black_striped_tshirt.png",
  },
];

export const loadData = async () => {
  await pool.query("DELETE FROM products");

  try {
    data2.map(async (item) => {
      const queryString = `INSERT INTO products (name, price, description, discount, style, branch, gender, imageurl)
    VALUES ('${item.name}',${item.price},
     '${item.description}',
      ${item.discount}, 
      '${item.style}', '${item.branch}', '${item.gender}', '${item.imageurl}'
      );`;
      await pool.query(queryString);
    });
  } catch (error) {
    console.log(error);
  }
};
