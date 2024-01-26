import express from "express";
import {
  getAllUser,
  getUser,
  getFollowers,
  getFollowing,
  FollowUser,
  unFollowUser,
  removeFollowers,
} from "../controllers/user.js";
import { tokenValidation } from "../middleware/tokenValidation.js";

const route = express.Router();

// READ
route.get("/:id/allUser", tokenValidation, getAllUser);
route.get("/:_id", tokenValidation, getUser);
route.get("/followers/:_id", tokenValidation, getFollowers);
route.get("/following/:_id", tokenValidation, getFollowing);

// UPDATE
route.put("/follow/:id/:reqId", tokenValidation, FollowUser);
route.put("/unFollow/:id/:reqId", tokenValidation, unFollowUser);
route.put("/rFollowers/:id/:reqId", tokenValidation, removeFollowers);

export default route;
