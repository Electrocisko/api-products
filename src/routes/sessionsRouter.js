import express from "express";
import {registerUser, userLogin,userLogout, currentUser} from "../controllers/sessionController.js";
import passport from "passport";


const router = express.Router();

router.post("/sessions/register", passport.authenticate('register'), registerUser);

router.post("/sessions/login", passport.authenticate('login'),userLogin);

router.post('/sessions/logout', userLogout );

router.get('/sessions/current', currentUser );



export default router;