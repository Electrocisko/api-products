import { pool } from "../database/postgres.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";

const tableName = "users";

const registerUser = async (req, res) => {

  try {
    const user = req.user;
    res.status(201).json({
      statusOk: true,
      message: "User registred successfully",
      user
    });
  } catch (error) {
    res.status(code).json({
      statusOk: false,
      message: error.message,
    });
  }
};


const userLogin = async (req, res) => {
  try {
      req.session.user = req.user;
      return res.json({
        statusOk: true,
        message: "User loged successfully",
      });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};


const userLogout = (req, res) => {
  req.logout((err) => {
      if (err) {
          return res.status(500).json({ message: 'Error logging out' });
      }
      res.json({ 
        statusOk: true,
        message: "User logout successfully", 
      });
  });
};


export { registerUser, userLogin , userLogout};
