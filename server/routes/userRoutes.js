import express from "express";
import { register_post } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register_post);

export default router;
