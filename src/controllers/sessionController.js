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
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};


const userLogin = async (req, res) => {
  try {
      return res.json({
        statusOk: true,
        message: "User loged successfully",
      });
  } catch (error) {
    return res.json({
      statusOk: false,
      message: error.message,
    });
  }
};


const userLogout = (req, res) => {
  req.logout((error) => {
      if (error) {
          return res.status(500).json({
            statusOk: false,
            message: error.message,
          });
      }
      res.json({ 
        statusOk: true,
        message: "User logout successfully", 
      });
  });
};


// Tendria que usar un DTO
const currentUser =  (req, res) => {


  try {
    if (!req.user)  throw new Error("There is no User logged in")
    return res.json({
      statusOk: true,
      message: "Current User",
      user: req.user
  
    });
  } catch (error) {
    return res.json({
      statusOk: false,
      message: error.message,
    });
  }
}







export { registerUser, userLogin , userLogout, currentUser};
