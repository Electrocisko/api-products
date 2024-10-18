import { pool } from "../database/postgres.js";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";

const tableName = "users";

// const registerUser = async (req, res) => {
//   let code = 500;
//   try {
//     const { name, lastname, email, password, password2, phone } = req.body;
//     if (!name || !lastname || !email || password || password2) code = 400;
//     if (!name) throw new Error("Missing Name");
//     if (!lastname) throw new Error("Missing Lastname");
//     if (!email) throw new Error("Missing Email");
//     if (!password || !password2) throw new Error("Missing password");
//     if (password != password2) throw new Error("Password don't match");
//     const hashedPassword = await createHash(password);

//     const query = `INSERT INTO ${tableName} (name, lastname, email, password, phone)
// VALUES ('${name}', '${lastname}', '${email}', '${hashedPassword}','${phone}') RETURNING name, lastname, email;`;

//     const data = await pool.query(query);
//     const user = data.rows[0];
//     if (data.rowCount == 0) throw new Error("Error on register new user");

//     res.status(201).json({
//       statusOk: true,
//       message: "User registred successfully",
//       user
//     });
//   } catch (error) {
//     res.status(code).json({
//       statusOk: false,
//       message: error.message,
//     });
//   }
// };

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
