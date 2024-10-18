import express from "express";
import {registerUser} from "../controllers/sessionController.js";
import passport from "passport";


const router = express.Router();

router.post("/sessions/register", passport.authenticate('register'), registerUser);

router.post("/sessions/login", passport.authenticate('login'), registerUser);










export default router;