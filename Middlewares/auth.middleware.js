// Middlewares/auth.middleware.js
import supabase from "../Services/supabaseClient.js";

export async function authMiddleware(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Utilisateur non connecté." });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ message: "Token invalide ou expiré." });
    }

    req.user = data.user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur." });
  }
}
