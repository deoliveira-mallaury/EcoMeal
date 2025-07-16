import profilModel from "../Models/profil.model.js";

// Controllers/profil.controller.js
export async function getUser(req, res) {
  try {
    // Récupéré via authMiddleware
    const user = req.user;

    return res.status(200).json({
      email: user.email,
      pseudo: user.user_metadata?.pseudo || user.email.split("@")[0],
    });
  } catch (error) {
    console.error("Erreur getUser :", error.message);
    return res.status(500).json({ message: "Erreur serveur." });
  }
}
