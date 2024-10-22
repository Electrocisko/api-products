import express from "express";
import {registerUser, userLogin,userLogout, currentUser} from "../controllers/sessionController.js";
import passport from "passport";
import validateFormRegister from "../middlewares/validateFormRegister.js";
import validateLogin from "../middlewares/validateLogin.js";


const router = express.Router();

router.post("/sessions/register", validateFormRegister,  passport.authenticate('register'), registerUser);

router.post("/sessions/login",validateLogin, passport.authenticate('login'),userLogin);

router.post('/sessions/logout', userLogout );

router.get('/sessions/current', currentUser );



export default router;