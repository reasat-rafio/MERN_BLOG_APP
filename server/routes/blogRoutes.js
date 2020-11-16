import express from "express";
import { blogs_get, blogs_post } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogs_get);
router.post("/post", blogs_post);

export default router;
