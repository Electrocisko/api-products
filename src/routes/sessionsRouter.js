import express from "express";
import {registerUser, userLogin} from "../controllers/sessionController.js";
import passport from "passport";


const router = express.Router();

router.post("/sessions/register", passport.authenticate('register'), registerUser);

//router.post("/sessions/login",userLogin);

router.post("/sessions/login", passport.authenticate('login', {failureRedirect: '/error', failureMessage: true} ),userLogin);



export default router;