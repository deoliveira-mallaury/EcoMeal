import express from "express";
import { auth } from "../Controllers/index.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", auth.createUser);
router.post("/login", auth.login);
// router.get("/login", auth.login);
router.get("/logout", auth.logout);

export default router;
