import express from "express";
import {
   register_post,
   login_post,
   logout_post,
} from "../controllers/userController.js";

const router = express.Router();

// router.get("/", (req, res) => {
//    res.send("adads");
// });

router.post("/register", register_post);

router.post("/login", login_post);

router.post("/logout", logout_post);

export default router;
