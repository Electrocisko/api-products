import express from "express";
import {registerUser, userLogin, currentUser} from "../controllers/sessionController.js";
import validateFormRegister from "../middlewares/validateFormRegister.js";
import validateLogin from "../middlewares/validateLogin.js";

const router = express.Router();
// router.post("/sessions/login",validateLogin, passport.authenticate('login'),userLogin);

router.get('/sessions/current', currentUser );

router.post("/sessions/register", validateFormRegister,  registerUser);

router.post("/sessions/login", validateLogin, userLogin);



export default router;