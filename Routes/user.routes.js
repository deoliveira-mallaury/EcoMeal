// routes/user.route.js
import express from "express";
import { profil } from "../Controllers/index.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// Utilisateur connecté
router.get("/", authMiddleware, profil.getUser);

export default router;
