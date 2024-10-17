import express from "express";
import {registerUser} from "../controllers/sessionController.js";


const router = express.Router();

router.post("/sessions/register", registerUser);










export default router;