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
    if (data.rowCount == 0) throw new Error("Product not found in database")
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
    res.status(200).json({
      statusOk: true,
      colorList,
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

    if (!product_id || !color_id || !size_id || !quantity)
      throw new Error("Incomplete data in the form");
    // Falta validaciones

    await pool.query(`INSERT INTO stock (product_id, color_id, size_id, quantity) 
VALUES (${product_id}, ${color_id}, ${size_id}, ${quantity}); `);

    res.status(200).json({
      statusOk: true,
      message: "Proxima stock",
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
      imageurl,
      color_id,
      size_id,
      quantity,
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

    // FALTA VER EL TEMA DE LOS ID DE STOCKS
    const query = `DO $$
                    DECLARE
                        new_product_id INT;
                    BEGIN
                        INSERT INTO products (name, price, description, discount, style, branch, gender, imageurl)
                        VALUES  ('${name}',${price},'${description}',${discount},'${style}','${branch}','${gender}','${image}')
                        RETURNING product_id INTO new_product_id;

                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 1, ${querySize_XS});
                        
                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 2, ${querySize_S});

                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 3, ${querySize_M});

                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 4, ${querySize_L});

                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 5, ${querySize_XL});

                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 6, ${querySize_XXL});

                        INSERT INTO stock (product_id, color_id, size_id, quantity)
                        VALUES (new_product_id, ${color_id}, 7, ${querySize_3XL});
                    END $$;`;

    const response = await pool.query(query);

    res.status(200).json({
      statusOk: true,
      message: "Successfully added",
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
    const {id} = req.params;  
    await pool.query(`DELETE FROM stock WHERE product_id = ${id};`)
    const productDeleteResponse = await pool.query(`DELETE FROM products WHERE product_id = ${id};`)
   if (productDeleteResponse.rowCount == 0) throw new Error("The product ID does not exist") 
    res.status(200).json({
      statusOk: true,
      message: "Here delete product",
      id
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
};
