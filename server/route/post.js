import express from "express";
import {
  allPosts,
  userPost,
  likePost,
  commentPost,
  getComment,
  getLikePosts,
  getCommentPosts,
} from "../controllers/post.js";
import { tokenValidation } from "../middleware/tokenValidation.js";

const route = express.Router();

// Read state
route.get("/allPosts", tokenValidation, allPosts);
route.get("/:Id/posts", tokenValidation, userPost);
route.get("/getcomment/:postId", tokenValidation, getComment);
route.get("/getLikePost/:userId", tokenValidation, getLikePosts);
route.get("/getCommentPost/:userId", tokenValidation, getCommentPosts);

// Update state
route.put("/like/:Id/:postId", tokenValidation, likePost);
route.put("/comment/:Id/:postId", tokenValidation, commentPost);

export default route;
