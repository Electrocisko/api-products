-- Tabla de Productos

CREATE TABLE products (
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );


-- Insertar un producto con información de stock en formato JSONB
INSERT INTO products (name, price, description,sizes_stock, color_stock, discount, style, branch, gender, imageurl)
VALUES (
  'Camiseta Básica',
  25.99,
  'Camiseta de algodón básica',
    '[
    {"size": "s", "quantity": 10},
    {"size": "m", "quantity": 5},
    {"size": "l", "quantity": 8}
  ]',
  '[
    {"color": "Rojo", "quantity": 10},
    {"color": "Azul", "quantity": 5},
    {"color": "Verde", "quantity": 8}
  ]',
  10,
  'casual',
  'Wrangler',
  'unisex',
  'https://picsum.photos/200'
);

--Para consultas

-- Consultar un producto específico por ID
SELECT
    product_id,
    name AS product_name,
    price,
    description,
    color_stock
FROM
    products
WHERE
    product_id = 1; -- Reemplaza $1 con el ID del producto que estás buscando

-- Por nombre
SELECT
    *
FROM
    products
WHERE
    name = 'Camiseta Básica'; -- Reemplaza $1 con el ID del producto que estás buscando


-- Extraer la cantidad disponible para un producto por nombre;
SELECT
    p.product_id,
    p.name AS product_name,
    p.price,
    p.description,
    jsonb_array_elements(p.color_stock)->>'color' AS color,
    jsonb_array_elements(p.color_stock)->>'quantity' AS quantity
FROM
    products p
WHERE
    p.name ILIKE 'Camiseta Básica';


































-- Insertar un producto con información de stock en formato JSONB
INSERT INTO products (name, price, description, color_stock)
VALUES (
  'Camiseta Básica',
  25.99,
  'Camiseta de algodón básica',
  '[
    {"color": "Rojo", "quantity": 10},
    {"color": "Azul", "quantity": 5},
    {"color": "Verde", "quantity": 8}
  ]'
);

-- Extraer la cantidad disponible para el color "Azul"
SELECT
    p.product_id,
    p.name AS product_name,
    p.price,
    p.description,
    jsonb_array_elements(p.color_stock)->>'color' AS color,
    jsonb_array_elements(p.color_stock)->>'quantity' AS quantity
FROM
    products p
WHERE
    p.name ILIKE '%nombre_del_producto%' AND
    jsonb_array_elements(p.color_stock)->>'color' = 'Azul';
