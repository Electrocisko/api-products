
-- Tabla de Productos
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  discount SMALLINT,
  style VARCHAR(30),
  branch VARCHAR(30),
  gender VARCHAR(10),
  imageurl VARCHAR(255),
  quantity_sold INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );


   -- Tabla de Talles
CREATE TABLE sizes (
    size_id SERIAL PRIMARY KEY,
    size_name VARCHAR(50) NOT NULL
);

-- Table de colores con rgb en hexadecimal
CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR(50) NOT NULL,
    rgb_code CHAR(7) NOT NULL
);
-- rgb_code CHAR(7) NOT NULL: Código RGB del color en formato hexadecimal (por ejemplo, #FF5733). El tipo CHAR(7) es adecuado para almacenar códigos RGB en formato hexadecimal que incluyen el símbolo # seguido de seis caracteres hexadecimales.

--Table de stock
CREATE TABLE stock (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    color_id INT NOT NULL,
    size_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0, 
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id),
    FOREIGN KEY (size_id) REFERENCES sizes(size_id),
    UNIQUE (product_id, color_id, size_id)
);

--Insertar Producto y devuelve el id
  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('T-shirt with Tape Details',125,'This graphic t-shirt which is perfect for any occasion.
   Crafted from a soft and breathable fabric, it offers superior comfort and style.',
   10,'casual','chemea','male','tape_details_tshirt.png') RETURNING product_id;

  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('Skinny Fit Jeans',265,'Here is the description of the product.....',
   20,'casual','wrangler','women','skinny_fit_jeans.png') RETURNING product_id;

  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('Checkered Shirt',180,'Here is the description of the product.....',
   0,'casual','adidas','uni','chekered_shirt.png') RETURNING product_id;


INSERT INTO colors (color_name, rgb_code) VALUES
    ('Negro', '#000000'),
    ('Blanco', '#FFFFFF'),
    ('Rojo', '#FF0000'),
    ('Verde', '#00FF00'),
    ('Azul', '#0000FF'),
    ('Amarillo', '#FFFF00'),
    ('Cyan', '#00FFFF'),
    ('Magenta', '#FF00FF'),
    ('Gris', '#808080'),
    ('Rosa', '#FFC0CB'),
    ('Naranja', '#FFA500'),
    ('Marrón', '#A52A2A'),
    ('Beige', '#F5F5DC'),
    ('Violeta', '#800080'),
    ('Turquesa', '#40E0D0'),
    ('Oliva', '#808000'),
    ('Lila', '#C8A2C8'),
    ('Azul Claro', '#ADD8E6'),
    ('Rojo Oscuro', '#8B0000'),
    ('Verde Oliva', '#6B8E23'),
    ('Gris Claro', '#D3D3D3'),
    ('Naranja Claro', '#FFD700'),
    ('Rosa Claro', '#FFB6C1'),
    ('Marrón Claro', '#D2B48C'),
    ('Gris Oscuro', '#A9A9A9'),
    ('Rojo Coral', '#FF7F50'),
    ('Verde Pastel', '#77DD77'),
    ('Azul Marino', '#000080'),
    ('Beige Claro', '#F5F5F5'),
    ('Púrpura', '#800080'),
    ('Café', '#4B0082');



  -- Insertar tallas
INSERT INTO sizes (size_name) 
VALUES ('XS'),('S'), ('M'), ('L'), ('XL'), ('XXL'), ('3XL');

-- Insertar stock
INSERT INTO stock (product_id, color_id, size_id, quantity) 
VALUES (14, 1, 1, 50), 
       (14, 1, 2, 30),  
       (14, 2, 1, 20);  


-- Traer todo desde tabla de stock
SELECT *
FROM stock
INNER JOIN colors ON stock.color_id = colors.color_id
INNER JOIN products ON stock.product_id = products.product_id
INNER JOIN sizes ON stock.size_id = sizes.size_id;

-- Traer talles y colores 
SELECT quantity, color_name, size_name, name
FROM stock
INNER JOIN colors ON stock.color_id = colors.color_id
INNER JOIN products ON stock.product_id = products.product_id
INNER JOIN sizes ON stock.size_id = sizes.size_id;


-- Traer Stock
SELECT 
	products.name,
    stock.product_id,
    colors.color_name,
    sizes.size_name,
    stock.quantity
FROM 
    stock
JOIN
	products ON stock.product_id = products.product_id
JOIN 
    colors  ON stock.color_id = colors.color_id
JOIN 
    sizes  ON stock.size_id = sizes.size_id
WHERE 
    stock.quantity > 0;

-- Traer datos por product_id con talles y colores;

SELECT 
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
    p.product_id = 14 
    AND st.quantity > 0;

    --Traer los talles disponibles por product id
    SELECT 
    sz.size_name
FROM 
    stock st
JOIN 
    sizes sz ON st.size_id = sz.size_id
WHERE 
    st.product_id = 14 
    AND st.quantity > 0
GROUP BY 
    sz.size_name;

    --Traer los colores disponibles por product id
    SELECT 
    c.color_name,
    c.rgb_code
FROM 
    stock st
JOIN 
    colors c ON st.color_id = c.color_id
WHERE 
    st.product_id = 1 
    AND st.quantity > 0
GROUP BY 
    c.color_name, c.rgb_code;

--Para buscar el stock de un producto por su id, codigo de color y nombre de talla seria:
SELECT 
    st.quantity,
    c.color_name,
    c.rgb_code,
    sz.size_name
FROM 
    stock st
JOIN 
    colors c ON st.color_id = c.color_id
JOIN 
    sizes sz ON st.size_id = sz.size_id
WHERE 
    st.product_id = --<your_product_id>
    AND c.rgb_code = --<your_rgb_code>
    AND sz.size_name = --<your_size_name>;

-- Para ingresar un Producto nuevo con el stock.

DO $$
DECLARE
    new_product_id INT;
BEGIN
    -- Paso 1: Insertar el nuevo producto
    INSERT INTO products (name, price, description, discount, style, branch, gender, imageurl, quantity_sold)
    VALUES ('Nombre del Producto', 99.99, 'Descripción del Producto', 10, 'Estilo', 'Sucursal', 'Género', 'http://example.com/image.jpg', 0)
    RETURNING product_id INTO new_product_id;
    
    -- Paso 2: Insertar el stock para el nuevo producto
    INSERT INTO stock (product_id, color_id, size_id, quantity)
    VALUES (new_product_id, 1, 2, 50); -- Aquí debes reemplazar 1 y 2 con los IDs reales de color y talla, y 50 con la cantidad deseada

    -- Puedes insertar más filas en la tabla stock si es necesario
    -- INSERT INTO stock (product_id, color_id, size_id, quantity)
    -- VALUES (new_product_id, otro_color_id, otra_talla_id, otra_cantidad);
END $$;

