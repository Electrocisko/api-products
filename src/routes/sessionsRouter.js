import express from "express";
import {registerUser, userLogin, currentUser} from "../controllers/sessionController.js";
import validateFormRegister from "../middlewares/validateFormRegister.js";
import validateLogin from "../middlewares/validateLogin.js";
import passport from "passport";

const router = express.Router();

router.post("/sessions/register", validateFormRegister,  registerUser);
router.post("/sessions/login", validateLogin, userLogin);
router.get('/sessions/current', passport.authenticate('jwt', { session: false }), currentUser );


export default router;