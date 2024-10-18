import { pool } from "../database/postgres.js";
const tableName = "users";

const getAllUsers = async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM ${tableName}`);
    res.status(200).json({
      statusOk: true,
      data: data.rows,
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
    const data = await pool.query(`SELECT * FROM users WHERE user_id = '${id}';`);

    if (data.rowCount == 0)  {res.status(400).json({statusOK: false, message: "No user was found with the id"}) } else {
        res.status(200).json({
            statusOk: true,
            data: data.rows,
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
