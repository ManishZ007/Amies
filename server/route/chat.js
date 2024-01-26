import express from "express";
import { tokenValidation } from "../middleware/tokenValidation.js";
import { addMessage, getAllMessage } from "../controllers/chat.js";

const route = express.Router();

route.post("/addMsg", tokenValidation, addMessage);
route.post("/getMsg", tokenValidation, getAllMessage);

export default route;
