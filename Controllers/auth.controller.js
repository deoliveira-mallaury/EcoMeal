import authModel from "../Models/auth.model.js";

// Fonction de création d'utilisateur
export async function createUser(req, res) {
  const { email, password, pseudo, location } = req.body;
  console.log(email, password, pseudo, location);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Nom, email et mot de passe sont requis." });
  }
  try {
    const result = await authModel.signup(email, password, pseudo, location);

    if (result?.error) {
      return res.status(500).json({ message: result.error.message });
    }
    console.log(result);

    return res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur createUser:", error.message);
    return res.status(500).json({
      message: "Erreur serveur lors de la création de l'utilisateur.",
    });
  }
}

// Fonction de connexion
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe requis." });
  }

  const session = await authModel.login(email, password);

  if (!session) {
    return res.status(401).json({ message: "Identifiants invalides." });
  }

  // ✅ Stocke le token dans un cookie sécurisé
  res.cookie("access_token", session.access_token, {
    httpOnly: true,
    secure: true, // à activer seulement en HTTPS
    sameSite: "Strict", // évite les fuites cross-site
    maxAge: 60 * 60 * 24 * 1000, // 1 jour
  });

  return res.status(200).json({ message: "Connecté avec succès." });
}

// Fonction de déconnexion
export async function logout(req, res) {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Déconnecté avec succès." });
}
