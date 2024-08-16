import { pool } from "../postgres.js"




const createTable = async () => {

    const queryString = `CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  sizes_stock JSONB,
  color_stock JSONB,
  discount SMALLINT,
  style VARCHAR(30),
  branch VARCHAR(30),
  gender VARCHAR(10),
  imageurl VARCHAR(255),
  quantity_sold INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`




    try {
        await pool.query(queryString);
    } catch (error) {
        console.log(error);
    }

}

export {createTable}