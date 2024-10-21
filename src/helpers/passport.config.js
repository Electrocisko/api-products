import passport from "passport";
import local from "passport-local";
import { createHash, isValidPassword } from "../helpers/cryptPassword.js";
import { pool } from "../database/postgres.js";
const tableName = "users";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  try {
    passport.use(
      "register",
      new LocalStrategy(
        {
          passReqToCallback: true,
          usernameField: "email",
        },
        async (req, email, password, done) => {
          const { name, lastname, password2, phone } = req.body;
          if (!name) return done(null, false, { message: "Missing Name" });
          if (!lastname)
            return done(null, false, { message: "Missing Lastname" });
          if (!password || !password2)
            return done(null, false, { message: "Missing Password" });
          if (password != password2)
            return done(null, false, { message: "Paswords don't match" });
          const exists = await pool.query(
            `SELECT * FROM users WHERE email = '${email}';`
          );

          if (exists.rowCount != 0)
            return done(null, false, { message: "User already exist" });
          const hashedPassword = await createHash(password);
          const query = `INSERT INTO ${tableName} (name, lastname, email, password, phone)
            VALUES ('${name}', '${lastname}', '${email}', '${hashedPassword}','${phone}') RETURNING name, lastname, email;`;

          const data = await pool.query(query);
          const user = data.rows[0];
          if (data.rowCount == 0)
            return done(null, false, { message: "Error in register user" });

          return done(null, user);
        }
      )
    );

    passport.use(
      "login",
      new LocalStrategy(
        {
          usernameField: "email",
        },
        async (email, password, done) => {
          const data = await pool.query(
            `SELECT * FROM users WHERE email = '${email}';`
          );
          const userDB = data.rows[0];

          if (!userDB)
            return done(null, false, { message: "No existe usuario" });
          const valid = await isValidPassword(password, userDB.password);
          if (valid) {
            return done(null, userDB);
          }
          return done(null, false, {
            message: "error en validacion de usuario",
          });
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
      return done(null, user);
    });
  } catch (error) {
    console.log("passport error", error);
  }
};

export default initializePassport;
