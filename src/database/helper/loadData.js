import { pool } from "../postgres.js";

export const data = [
  { 
    name: "T-shirt with Tape Details",
    price: 120,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "chemea",
    gender: "uni",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Skinny Fit Jeans",
    price: 260,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 20,
    style: "casual",
    branch: "wrangler",
    gender: "uni",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Checke(236, 138, 14) Shirt",
    price: 180,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "adidas",
    gender: "men",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Sleeve Striped T-shirt",
    price: 160,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 30,
    style: "casual",
    branch: "nike",
    gender: "women",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Vertical Striped Shirt",
    price: 232,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 20,
    style: "casual",
    branch: "chemea",
    gender: "women",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Courage Graphic T-shirt",
    price: 145,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "adidas",
    gender: "men",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "zara",
    gender: "women",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Faded Skinny Jeans",
    price: 210,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "dia",
    gender: "women",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "One Life Graphic T-shirt",
    price: 300,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 40,
    style: "casual",
    branch: "chispita",
    gender: "men",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Polo with Contrast Trims",
    price: 242,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 20,
    style: "casual",
    branch: "generica",
    gender: "men",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Gradient Graphic T-shirt",
    price: 145,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "wrangler",
    gender: "women",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Polo with Tipping Details",
    price: 180,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 0,
    style: "casual",
    branch: "zara",
    gender: "men",
    imageurl: "https://picsum.photos/200",
  },
  {
    name: "Black Striped T-shirt",
    price: 150,
    description: "Lorem Ipsum",
    sizes_stock: '[{"size": "s", "quantity": 10},{"size": "m", "quantity": 5},{"size": "l", "quantity": 8}]',
    color_stock: '[{"color": "(236, 138, 14)", "quantity": 10},{"color": "(79, 83, 213)", "quantity": 5},{"color": "(218, 29, 104 )", "quantity": 8}]',
    discount: 30,
    style: "casual",
    branch: "nike",
    gender: "men",
    imageurl: "https://picsum.photos/200",
  },
];

export const loadData = async () => {
  try {
    data.map(async (item) => {

const queryString = `INSERT INTO products (name, price, description,sizes_stock, color_stock, discount, style, branch, gender, imageurl)
    VALUES ('${item.name}',${item.price}, '${item.description}','[
    {"size": "s", "quantity": 10},
    {"size": "m", "quantity": 5},
    {"size": "l", "quantity": 8}
  ]' ,
  '${item.color_stock}',
  ${item.discount}, 
             '${item.style}', '${item.branch}', '${item.gender}', '${item.imageurl}'
             );
             `
        await pool.query(queryString);

        //console.log(queryString);
    });
  } catch (error) {
    console.log(error);
  }
};
