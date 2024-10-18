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
        // console.log(req.user);
      req.session.user = req.user;
      return res.json({
        message: "Logueado",
        
      });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export { registerUser, userLogin };
