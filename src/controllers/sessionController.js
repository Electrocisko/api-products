import { pool } from "../database/postgres.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET_JWT;

const registerUser = async (req, res) => {
  const { name, lastname, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await pool.query(
      "INSERT INTO users (name, lastname, email, password, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, lastname, email, hashedPassword, phone]
    );
    const user = {
      name: newUser.rows[0].name,
      lastname: newUser.rows[0].lastname,
      email: newUser.rows[0].email,
      phone: newUser.rows[0].phone,
    };
    return res.status(201).json({
      statusOk: true,
      message: "User loged successfully",
      user,
    })
  } catch (error) {
    res.status(400).json({
      error: "Error creando usuario",
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try { 
      const { email, password } = req.body;
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length > 0 && await bcrypt.compare(password, user.rows[0].password)) {
          const token = jwt.sign({ user_id: user.rows[0].user_id }, SECRET, { expiresIn: '1h' });
          res.status(200).json({
            statusOk: true,
            message: "User loged successfully",
            token,
          });
      } else {
        return res.status(401).json({
          statusOk: false,
          message: "Non-existent user or invalid password",
        });
      }
  } catch (error) {
    return res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const currentUser = (req, res) => {
  try {
 
    return res.json({
      statusOk: true,
      message: "Current User",
  
    });
  } catch (error) {
    return res.json({
      statusOk: false,
      message: error.message,
    });
  }
};

export { registerUser, userLogin,  currentUser };
