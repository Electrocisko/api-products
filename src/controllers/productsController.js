import { pool } from "../database/postgres.js";

const tableName = "products";

const getAllProducts = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM ${tableName}`);
    res.status(200).json({
      statusOk: true,
      data: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const queryString = `SELECT * FROM ${tableName} ORDER BY created_at DESC LIMIT 4;`;
    const data = await pool.query(queryString);
    res.status(200).json({
      statusOk: true,
      newProducts: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const queryString = `SELECT * FROM ${tableName} ORDER BY quantity_sold DESC ;`;
    const data = await pool.query(queryString);
    res.status(200).json({
      statusOk: true,
      topsells: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM ${tableName} WHERE product_id = ${id};`;

    const queryAllData = `SELECT 
    p.product_id,
    p.name AS product_name,
    p.price,
    p.description,
    p.discount,
    p.style,
    p.branch,
    p.gender,
    p.imageurl,
    p.quantity_sold,
    p.created_at,
    c.color_name,
	  c.rgb_code,
    sz.size_name,
    st.quantity
FROM 
    products p
JOIN 
    stock st ON p.product_id = st.product_id
JOIN 
    colors c ON st.color_id = c.color_id
JOIN 
    sizes sz ON st.size_id = sz.size_id
WHERE 
    p.product_id = ${id} 
    AND st.quantity > 0;`;

    const queryColorsByProductId = `SELECT 
    c.color_name,
    c.rgb_code
    FROM 
    stock st
    JOIN 
    colors c ON st.color_id = c.color_id
    WHERE 
    st.product_id = ${id} 
    AND st.quantity > 0
    GROUP BY 
    c.color_name, c.rgb_code;`;

    const querySizesByProductId = `    SELECT 
    sz.size_name
    FROM 
    stock st
    JOIN 
    sizes sz ON st.size_id = sz.size_id
    WHERE 
    st.product_id = ${id} 
    AND st.quantity > 0
    GROUP BY 
    sz.size_name;`;

    const colorsAviable = await pool.query(queryColorsByProductId);
    const sizesAviables = await pool.query(querySizesByProductId);

    const data = await pool.query(query);
    if (data.rowCount == 0) {
      res.status(400).json({
        statusOK: false,
        message: " Product not found in database",
      });
    }
    res.status(200).json({
      statusOk: true,
      data: data.rows,
      colors: colorsAviable.rows,
      sizes:  sizesAviables.rows
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

export { getAllProducts, getNewProducts, getTopProducts, getProductById };
