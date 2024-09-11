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

    const stockAviable = await pool.query(queryAllData);

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
      stock: stockAviable.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const createNewproduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discount,
      style,
      branch,
      gender,
      imageurl,
    } = req.body;

    // Falta multer
    let image;
    !req.file ? (image = "generico.png") : (image = req.file.filename);

    const query = `  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('${name}',${price},'${description}',${discount},'${style}','${branch}','${gender}','${image}') RETURNING product_id;`;

    const id = await pool.query(query);

    res.status(200).json({
      statusOk: true,
      message: "Successfully added",
      product_id: id.rows[0].product_id
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

// Esto es para que el front pueda ver todos los colores
const getAllColors = async (req, res) => {
  try {
    const colors = await pool.query("SELECT * from colors;");
    const colorList = colors.rows;
    res.status(200).json({
      statusOk: true,
      colorList
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

// Controlador que trae todos los tallas.
const getAllSizes = async (req,res) => {
  try {
    const sizes = await pool.query('SELECT * FROM sizes;')
    const sizesList = sizes.rows
    res.status(200).json({
      statusOk: true,
      sizesList
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
}

export {
  getAllProducts,
  getNewProducts,
  getTopProducts,
  getProductById,
  createNewproduct,
  getAllColors,
  getAllSizes
};
