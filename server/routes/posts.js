import express from "express";
import { getFeedPosts, getUserPosts, likePost, createPost } from "../controllers/posts.js";
// import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", createPost);

/* READ */
router.get("/", getFeedPosts);
router.get("/:userId/posts", getUserPosts);

/* UPDATE */
router.patch("/:id/like", likePost);

export default router;
