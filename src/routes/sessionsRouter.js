import express from "express";
import {registerUser, userLogin,userLogout, currentUser} from "../controllers/sessionController.js";
import passport from "passport";
import validateFormRegister from "../middlewares/validateFormRegister.js";
import validateLogin from "../middlewares/validateLogin.js";
//////////////////////////////////////////
import {createHash,isValidPassword} from "../helpers/cryptPassword.js";
import { pool } from "../database/postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const tableName = "users";
const SECRET = process.env.SECRET_JWT;


const router = express.Router();

//router.post("/sessions/register", validateFormRegister,  passport.authenticate('register'), registerUser);

// router.post("/sessions/login",validateLogin, passport.authenticate('login'),userLogin);

router.post('/sessions/logout', userLogout );

router.get('/sessions/current', currentUser );

///////////////////////////////////////////////////////////////////////////////////

router.post("/sessions/register", async (req, res) => {
    const { name, lastname, email, password, password2, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        //const newUser = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        const query = `INSERT INTO ${tableName} (name, lastname, email, password, phone)
        VALUES ('${name}', '${lastname}', '${email}', '${hashedPassword}','${phone}') RETURNING name, lastname, email;`;
        const newUser = await pool.query(query);
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error creando usuario' });
        message: error.message
    }
});


router.post("/sessions/login",
    async (req, res) => {
        const { email, password } = req.body;

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
        if (user.rows.length > 0 && await bcrypt.compare(password, user.rows[0].password)) {
            const token = jwt.sign({ user_id: user.rows[0].user_id }, SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    }
);



export default router;