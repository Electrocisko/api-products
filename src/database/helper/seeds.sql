CREATE TABLE products (
  title TEXT,
  price NUMERIC,
  description TEXT,
  create_at DATE
  )

// con colores como un json
CREATE TABLE products (
  title TEXT,
  price NUMERIC,
  description TEXT,
  colors JSONB,
  create_at DATE
  )

insert into products (title, price, description, create_at)
values ('soda',200,'funca?','2024-08-15');

//Ejemplo de como ingresar el dato de colores como un json.

insert into products (title, price, description, create_at, colors)
values ('soda',200,'funca?','2024-08-15', '{"color": "rojo"}');

// con colores como un arreglo de strings.
CREATE TABLE products (
id SERIAL PRIMARY KEY,
  title TEXT,
  price NUMERIC,
  description TEXT,
  colors_list text[],
  create_at DATE
  )

insert into products (title, price, description, create_at, colors_list)
values ('soda',200,'funca?','2024-08-15', ARRAY ['rojo', 'verde', 'azul']);

// Para buscar un elemento
SELECT *, colors_list[2] FROM products;

// Pedir por un dato de un item
SELECT colors_list  FROM products where title='soda';

//Para buscar por ejemplo el primer datos de la lista
SELECT colors_list[1] from products where id=1;

// TABLA PRODUCTOS
CREATE TABLE products (
id SERIAL PRIMARY KEY,
  name TEXT,
  price NUMERIC,
  description TEXT,
  sizes_list text[],
  colors_list text[],
  discount numeric,
  style text,
  branch text,
  gender text,
  imageurl text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  

// Para insertar los datos
insert into products 
(name, price, description,sizes_list,colors_list,discount,style,branch,gender,imageurl)
VALUES (
  'T-shirt with Tape Details',
  120,
  'Here write the description',
  ARRAY ['s', 'm', 'xl'],
  ARRAY ['131, 29, 58', '231, 177, 24 ', '123, 13, 155'],
  10,
  'casual',
  'wrangler',
  'men',
  'https://picsum.photos/200'
  );

  // ejemplo de seeds

      const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    