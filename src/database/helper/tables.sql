
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
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id),
    FOREIGN KEY (size_id) REFERENCES sizes(size_id),
    UNIQUE (product_id, color_id, size_id)
);

--Insertar Producto
  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('T-shirt with Tape Details',125,'This graphic t-shirt which is perfect for any occasion.
   Crafted from a soft and breathable fabric, it offers superior comfort and style.',
   10,'casual','chemea','male','tape_details_tshirt.png');

  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('Skinny Fit Jeans',265,'Here is the description of the product.....',
   20,'casual','wrangler','women','skinny_fit_jeans.png');

  INSERT INTO products (name,price, description, discount, style, branch,gender,imageurl)
  VALUES ('Checkered Shirt',180,'Here is the description of the product.....',
   0,'casual','adidas','uni','chekered_shirt.png');


-- Insertar Colores
INSERT INTO colors (color_name, rgb_code) VALUES 
('Azul Marino','#1c698a'),
('Naranja', '#c55c33'),
('Violeta', '#442945'),
('Verde Militar', '#4d452f'),
('Rosa Vieja','#a3747d'),
('Naranja oscura','#df5532'),
('Verde Camisa','#6f8169'),
('Blanco Tiza','#efe8e9'),
('Marron','#825B32'),
('Celeste','#6CBEC7'),
('Ocre','#6CBEC7'),
('Rojo alto','#6CBEC7'),
('Rojo bajo','#982B1C')
;


  -- Insertar tallas
INSERT INTO sizes (size_name) 
VALUES ('S'), ('M'), ('L');

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
