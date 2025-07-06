const express = require("express");
const app = express();
// 1. Charger les variables d'environnement (TRÈS IMPORTANT : doit être en haut !)
require("dotenv").config();
// 2. Middleware pour analyser les corps de requête au format JSON
// Ceci est indispensable pour que req.body contienne les données envoyées par le client (par ex. pour les POST/PUT)
app.use(express.json());
// 3. Importer et brancher les routes spécifiques aux notes

// Toutes les routes définies dans notesRoutes seront préfixées par '/api'
// Ex: router.get('/notes') devient accessible via GET /api/notes
// app.use("/api");

// --- MILEWARES GLOBAUX (si besoin) ---
// Exemple : Middleware pour servir les fichiers statiques (HTML, CSS, JS client, images)
// Si vous avez un dossier 'public' avec des fichiers statiques
app.use(express.static("public"));
app.get('/services', (req, res) => {
    res.sendFile(__dirname + "/public/services.html");
});
app.get('/habitats', (req, res) => {
res.sendFile(__dirname + "/public/habitats.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});
app.get('/login', (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

// ------------------------------------
// --- GESTION DES ERREURS (à placer TOUJOURS après toutes les routes) ---
// Middleware pour gérer les routes non trouvées (erreur 404)
app.use((req, res) => {
  res
    .status(404)
    .json({ message: "Route non trouvée. Vérifiez l'URL de votre requête." });
});
// Middleware de gestion d'erreurs global (erreur 500)
app.use((err, req, res, next) => {
  console.error(err.stack); // Affiche la trace de l'erreur dans la console du serveur
  res
    .status(500)
    .json({
      message:
        "Une erreur interne est survenue sur le serveur. Veuillez réessayer plus tard.",
    });
});
// --------------------------------------------------------------------
// 4. Démarrage du serveur Express
const PORT = process.env.PORT || 3000; // Utilise le port défini dans .env, ou 3000 par défaut
app.listen(PORT, () => {
  console.log(`Serveur Express en ligne : http://localhost:${PORT}`);
});
