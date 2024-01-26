import express from "express";
import { Login } from "../controllers/auth.js";
import { loginValidation } from "../middleware/authValidation.js";

const route = express.Router();

route.post("/login", loginValidation, Login);

export default route;
