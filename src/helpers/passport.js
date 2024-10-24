import {Strategy, ExtractJwt } from "passport-jwt";
import { pool } from "../database/postgres.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT,
    usernameField: "email",
};

const strategy = new Strategy(opts, async (jwtPayload, done) => {
    try {
        const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [jwtPayload.user_id]);
        const userPayload = {
            user_id: user.rows[0].user_id,
            name: user.rows[0].name,
            lastname: user.rows[0].lastname,
        }
        if (user.rows.length > 0) {
            return done(null, userPayload);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

const passport = (passport) => {
    passport.use(strategy);
};

export default passport;