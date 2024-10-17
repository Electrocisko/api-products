import { pool } from "../database/postgres.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";

const tableName = "users";

const registerUser = async (req, res) => {
  let code = 500;
  try {
    const { name, lastname, email, password, password2, phone } = req.body;
    if (!name || !lastname || !email || password || password2) code = 400;
    if (!name) throw new Error("Missing Name");
    if (!lastname) throw new Error("Missing Lastname");
    if (!email) throw new Error("Missing Email");
    if (!password || !password2) throw new Error("Missing password");
    if (password != password2) throw new Error("Password don't match");
    const hashedPassword = await createHash(password);

    const query = `INSERT INTO users (name, lastname, email, password, phone)
VALUES ('${name}', '${lastname}', '${email}', '${hashedPassword}','${phone}')`;

const data = await pool.query(query);
    if (data.rowCount == 0) throw new Error("Error on register new user")


    res.status(201).json({
      statusOk: true,
      message: "Aca se registra el user"
    });
  } catch (error) {
    res.status(code).json({
      statusOk: false,
      message: error.message,
    });
  }
};

export { registerUser };
