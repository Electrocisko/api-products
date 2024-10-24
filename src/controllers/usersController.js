import { pool } from "../database/postgres.js";
import userDTO from "../dtos/userDTO.js";


const getAllUsers = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM users`);
    const usersDTO = data.rows.map((user) => {
      return userDTO(user);
    });
    res.status(200).json({
      statusOk: true,
      usersDTO
    });
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(`SELECT * FROM users WHERE user_id = $1;`, [id]);
    const user = userDTO(data.rows[0])

    if (data.rowCount == 0)  {res.status(400).json({statusOK: false, message: "No user was found with the id"}) } else {
        res.status(200).json({
            statusOk: true,
            user
          });
    }
 
  } catch (error) {
    res.status(500).json({
      statusOk: false,
      message: error.message,
    });
  }
};

export { getAllUsers, getUserById };
