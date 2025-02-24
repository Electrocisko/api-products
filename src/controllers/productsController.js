import { pool } from "../database/postgres.js";
import fs from "fs";
import sortedColors from "../helpers/sortedColors.js";

const getAllProducts = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM products`);
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
    const queryString = `SELECT * FROM products ORDER BY created_at DESC LIMIT 20;`;
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
    const queryString = `SELECT * FROM products ORDER BY quantity_sold DESC ;`;
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

const getOnsaleProducts = async (req, res) => {
  try {
    const queryString = `SELECT * FROM products WHERE discount > 0;`;
    const data = await pool.query(queryString);
    res.status(200).json({
      statusOk: true,
      onsale: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getWomenProducts = async (req, res) => {
  try {
    const queryString = `SELECT * FROM products WHERE gender = 'women' OR gender = 'uni';`;
    const data = await pool.query(queryString);
    res.status(200).json({
      statusOk: true,
      products: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getMenProducts = async (req, res) => {
  try {
    const queryString = `SELECT * FROM products WHERE gender = 'men' OR gender = 'uni';`;
    const data = await pool.query(queryString);
    res.status(200).json({
      statusOk: true,
      products: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getUniProducts = async (req, res) => {
  try {
    const queryString = `SELECT * FROM products WHERE gender = 'uni';`;
    const data = await pool.query(queryString);
    res.status(200).json({
      statusOk: true,
      products: data.rows,
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
    const query = `SELECT * FROM products WHERE product_id = $1`;

    const queryAllData = `
    SELECT 
        c.color_name,
        c.hsl_code,
        c.color_id,
        sz.size_name,
        sz.size_id,
        st.quantity,
        st.imageurl
    FROM 
        products p
    JOIN 
        stock st ON p.product_id = st.product_id
    JOIN 
        colors c ON st.color_id = c.color_id
    JOIN 
        sizes sz ON st.size_id = sz.size_id
    WHERE 
        p.product_id = $1 
        AND st.quantity > 0;`;

    const data = await pool.query(query, [id]);
    const stockAviable = await pool.query(queryAllData, [id]);

    if (data.rowCount == 0) throw new Error("Product not found in database");
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
    const { name, price, description, discount, style, branch, gender } =
      req.body;

    let image;
    !req.file ? (image = "generico.png") : (image = req.file.filename);

    const query = `  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING product_id;`;

    const id = await pool.query(query, [
      name,
      price,
      description,
      discount,
      style,
      branch,
      gender,
      image,
    ]);

    res.status(200).json({
      statusOk: true,
      message: "Successfully added",
      product_id: id.rows[0].product_id,
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
    const sortedList = sortedColors(colorList);
    res.status(200).json({
      statusOk: true,
      colorList: sortedList,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

// Controlador que trae todos los tallas.
const getAllSizes = async (req, res) => {
  try {
    const sizes = await pool.query("SELECT * FROM sizes;");
    const sizesList = sizes.rows;
    res.status(200).json({
      statusOk: true,
      sizesList,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

//Controlador que carga stocks
const addStock = async (req, res) => {
  try {
    const { product_id, color_id, size_id, quantity } = req.body;

    //  multer
    let image;
    !req.file ? (image = "generico.png") : (image = req.file.filename);

    if (!product_id || !color_id || !size_id || !quantity)
      throw new Error("Incomplete data in the form.");
    // Falta validaciones

    await pool.query(
      `INSERT INTO stock (product_id, color_id, size_id, quantity, imageurl) 
  VALUES ($1, $2, $3, $4, $5);`,
      [product_id, color_id, size_id, quantity, image]
    );

    res.status(200).json({
      statusOk: true,
      message: "Stock Agregado",
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

//Controlador que carga producto nuevo con su stock.
const addNewFullProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discount,
      style,
      branch,
      gender,
      color_id,
      sizeXS,
      sizeS,
      sizeM,
      sizeL,
      sizeXL,
      sizeXXL,
      size3XL,
    } = req.body;

    // Valores predeterminados usando operadores lógicos
    let querySize_XS = sizeXS || 0;
    let querySize_S = sizeS || 0;
    let querySize_M = sizeM || 0;
    let querySize_L = sizeL || 0;
    let querySize_XL = sizeXL || 0;
    let querySize_XXL = sizeXXL || 0;
    let querySize_3XL = size3XL || 0;

    //  multer
    let image;
    !req.file ? (image = "generico.png") : (image = req.file.filename);

    const query1 =
      "INSERT INTO products (name, price, description, discount, style, branch, gender, imageurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)RETURNING product_id;";

    let response = await pool.query(query1, [
      name,
      price,
      description,
      discount,
      style,
      branch,
      gender,
      image,
    ]);

    // Obtengo los ids de la tabla sizes
    const sizes = await pool.query(
      "SELECT size_id FROM sizes ORDER BY size_id;"
    );
    const listSizeIds = sizes.rows.map((item) => {
      return item.size_id;
    });

    const new_product_id = parseInt(response.rows[0].product_id); // lo parseo a integer

    const query2 =
      "INSERT INTO stock (product_id, color_id, size_id, quantity, imageurl) VALUES " +
      " ($1, $2, $11, $3, $4)," +
      " ($1, $2, $12, $5, $4)," +
      " ($1, $2, $13, $6, $4)," +
      " ($1, $2, $14, $7, $4)," +
      " ($1, $2, $15, $8, $4)," +
      " ($1, $2, $16, $9, $4)," +
      " ($1, $2, $17, $10, $4);";

    response = await pool.query(query2, [
      new_product_id,
      color_id,
      querySize_XS,
      image,
      querySize_S,
      querySize_M,
      querySize_L,
      querySize_XL,
      querySize_XXL,
      querySize_3XL,
      listSizeIds[0],
      listSizeIds[1],
      listSizeIds[2],
      listSizeIds[3],
      listSizeIds[4],
      listSizeIds[5],
      listSizeIds[6],
    ]);

    res.status(200).json({
      statusOk: true,
      message: "Successfully added",
      new_product_id,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

//Borra producto por Id
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM stock WHERE product_id = $1;`, [id]);
    const productDeleteResponse = await pool.query(
      `DELETE FROM products WHERE product_id = $1 RETURNING *;`,
      [id]
    );
    if (productDeleteResponse.rowCount == 0) {
      throw new Error("The product ID does not exist");
    }
    if (productDeleteResponse.rows[0].imageurl != "generico.png") {
      fs.unlinkSync(
        `src/public/images/${productDeleteResponse.rows[0].imageurl}`
      );
    }

    res.status(200).json({
      statusOk: true,
      message: "Here delete product",
      id,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

//Controlador que agrega un opcion de color con su stock y tallas a un producto determinado por su id.
const addNewColorToProduct = async (req, res) => {
  try {
    const {
      product_id,
      color_id,
      sizeXS,
      sizeS,
      sizeM,
      sizeL,
      sizeXL,
      sizeXXL,
      size3XL,
    } = req.body;

    // Valores predeterminados usando operadores lógicos
    let querySize_XS = sizeXS || 0;
    let querySize_S = sizeS || 0;
    let querySize_M = sizeM || 0;
    let querySize_L = sizeL || 0;
    let querySize_XL = sizeXL || 0;
    let querySize_XXL = sizeXXL || 0;
    let querySize_3XL = size3XL || 0;

    //multer
    let image;
    !req.file ? (image = "generico.png") : (image = req.file.filename);

    // Obtengo los ids de la tabla sizes
    const sizes = await pool.query(
      "SELECT size_id FROM sizes ORDER BY size_id;"
    );
    const listSizeIds = sizes.rows.map((item) => {
      return item.size_id;
    });

    //const new_product_id = parseInt(response.rows[0].product_id); // lo parseo a integer

    const query2 =
      "INSERT INTO stock (product_id, color_id, size_id, quantity, imageurl) VALUES " +
      " ($1, $2, $11, $3, $4)," +
      " ($1, $2, $12, $5, $4)," +
      " ($1, $2, $13, $6, $4)," +
      " ($1, $2, $14, $7, $4)," +
      " ($1, $2, $15, $8, $4)," +
      " ($1, $2, $16, $9, $4)," +
      " ($1, $2, $17, $10, $4);";

    const response = await pool.query(query2, [
      product_id,
      color_id,
      querySize_XS,
      image,
      querySize_S,
      querySize_M,
      querySize_L,
      querySize_XL,
      querySize_XXL,
      querySize_3XL,
      listSizeIds[0],
      listSizeIds[1],
      listSizeIds[2],
      listSizeIds[3],
      listSizeIds[4],
      listSizeIds[5],
      listSizeIds[6],
    ]);

    res.status(200).json({
      statusOk: true,
      message: "Successfully color added ",
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

// Controlador que modifica el stock por  producto id (Ideal para actualizar su stock)
const modifiedStockById = async (req, res) => {
  try {
    const { quantity, product_id, color_id, size_id } = req.body;

    // Iniciar una transacción
    await pool.query("BEGIN");
    //Verificar el stock disponible
    const response = await pool.query(
      "SELECT quantity FROM stock WHERE product_id = $1 AND color_id = $2 AND size_id = $3",
      [product_id, color_id, size_id]
    );
    const availableStock = response.rows[0]?.quantity;

    if (availableStock === undefined) {
      throw new Error(
        "Product not available in this color and size combination"
      );
    }
    if (availableStock < quantity) {
      throw new Error("There is not enough stock for this product");
    }
    //Actualizar el stock
    await pool.query(
      "UPDATE stock SET quantity = quantity - $1 WHERE product_id = $2 AND color_id = $3 AND size_id = $4",
      [quantity, product_id, color_id, size_id]
    );
    // Confirmar la transacción
    await pool.query("COMMIT");

    res.status(200).json({
      statusOk: true,
      message: "Purchase processed correctly ",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const { key, value } = req.query;
    const allowedKeys = ["style", "gender", "branch"];
    if (!allowedKeys.includes(key)) {
      throw new Error("Invalid search key");
    }
    const query = `SELECT * FROM products WHERE ${key} ILIKE $1`;
    const response = await pool.query(query, [`%${value}`]);
    if (response.rowCount == 0) throw new Error("No data found");
    res.status(200).json({
      statusOk: true,
      data: response.rows,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const queryParamsProducts = async (req, res) => {
  try {
    let { price_min, price_max, styles, colors, sizes, genders, page, limit } =
      req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    let query = `
    SELECT DISTINCT p.product_id, p.name, p.price, p.description, p.discount, 
           p.style, p.branch, p.gender, p.imageurl, p.quantity_sold, p.created_at
    FROM products p
    JOIN stock s ON p.product_id = s.product_id
    JOIN colors c ON s.color_id = c.color_id
    JOIN sizes si ON s.size_id = si.size_id
    WHERE 1=1
  `;

    const params = [];

    if (price_min) {
      query += " AND price >= $1";
      params.push(price_min);
    }
    if (price_max) {
      query += " AND price <= $2";
      params.push(price_max);
    }
    if (styles && styles != "All") {
      const styleArray = styles.split(",");
      query += ` AND style = ANY($${params.length + 1})`;
      params.push(styleArray);
    }

    if (colors) {
      const colorArray = colors.split(",").map(Number); // Convertir a números
      const placeholders = colorArray
        .map((_, i) => `$${params.length + i + 1}`)
        .join(", ");
      query += ` AND c.color_id IN (${placeholders})`;
      params.push(...colorArray);
    }

    if (sizes) {
      const sizeArray = sizes.split(",");
      const placeholders = sizeArray
        .map((_, i) => `$${params.length + 1 + i}`)
        .join(", ");
      query += ` AND si.size_id IN (${placeholders})`;
      params.push(...sizeArray);
    }

    if (genders) {
      const genderArray = genders.split(",");
      const placeholders = genderArray
        .map((_, i) => `$${params.length + 1 + i}`)
        .join(", ");
      query += ` AND p.gender IN (${placeholders})`;
      params.push(...genderArray);
    }

    // Consulta para obtener el total de productos
    const { rows: totalCount } = await pool.query(query, params);
    const offset = (page - 1) * limit;
    query += `LIMIT ${limit} OFFSET ${offset};`;

    const response = await pool.query(query, params);

    const totalProductShowing = response.rowCount;
    const totalProducts = parseInt(totalCount.length);

    const totalPages = Math.ceil(totalProducts / limit);

    let dataFound = true;
    if (response.rowCount == 0) dataFound = false;

    res.status(200).json({
      statusOk: true,
      dataFound,
      data: response.rows,
      totalProducts,
      totalPages,
      page,
      totalProductShowing,
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

export {
  getAllProducts,
  getNewProducts,
  getTopProducts,
  getProductById,
  createNewproduct,
  getAllColors,
  getAllSizes,
  addStock,
  addNewFullProduct,
  deleteProductById,
  getOnsaleProducts,
  getMenProducts,
  getWomenProducts,
  getUniProducts,
  addNewColorToProduct,
  modifiedStockById,
  getFilteredProducts,
  queryParamsProducts,
};
