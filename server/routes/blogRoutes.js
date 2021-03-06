import express from "express";
import {
   blogs_get,
   blogs_post,
   blogs_delete,
   blogs_patch,
   profileBlogs_get,
   userProfileClickedBlog_get,
   userLiedPost_get,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", blogs_get);
router.post("/post", blogs_post);
router.delete("/delete/:id", blogs_delete);
router.patch("/edit/:id", blogs_patch);
router.get("/:id", profileBlogs_get);
router.get("/u/:id", userProfileClickedBlog_get);
router.get("/:id/likedpost", userLiedPost_get);

export default router;
