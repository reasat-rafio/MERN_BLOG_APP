import express from "express";
import {
   register_post,
   login_post,
   logout_post,
   likeBlog_post,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register_post);

router.post("/login", login_post);

router.post("/logout", logout_post);

router.post("/like/:id", likeBlog_post);

export default router;
