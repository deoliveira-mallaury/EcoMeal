import supabase from "../Services/supabaseClient.js";
import bcrypt from "bcrypt";

// Fonction d'inscription

export async function signup(email, password, pseudo, location) {
  // 👉 Étape 1 : envoie le mot de passe en clair à Supabase Auth (il le hash lui-même)
  const { data, error } = await supabase.auth.signUp({
    email,
    password, // ✅ Clé attendue par Supabase
    options: {
      data: {
        pseudo,
        location,
      },
    },
  });
  console.error(email, password, pseudo, location);
  console.log("Reçu par signup:", email, "[mot de passe caché]");

  if (error) {
    console.log("Erreur d'inscription :", error.message);
    return;
  }

  const userId = data.user?.id;
  if (!userId) {
    console.error("ID utilisateur manquant !");
    return;
  }

  // 👉 Étape 2 : enregistrer un profil personnalisé dans ta table usersCustom
  const hashedPwd = await bcrypt.hash(password, 10); // tu peux conserver ça pour stocker le hash manuellement

  const { error: insertError } = await supabase.from("profiles").insert([
    {
      id: userId,
      pseudo,
      location,
      email: data.user?.email,
      password: hashedPwd, // hashé manuellement pour ta propre table
    },
  ]);
  console.log(email, password, pseudo, location);

  if (insertError) {
    console.error(
      "Erreur lors de l'insertion du profil :",
      insertError.message
    );
  } else {
    console.log("Profil inséré !");
  }

  console.log("Utilisateur inscrit !", data.user);
}
export async function login(email, password) {
  const { data: authData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    console.error("Erreur de connexion :", signInError.message);
    return null;
  }

  // Récupérer la session après authentification
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Erreur récupération session :", sessionError.message);
    return null;
  }

  console.log("Connecté !", sessionData.session?.user);
  console.log("Session :", sessionData.session);

  return sessionData.session; // ou juste sessionData.user si tu veux le user
}

// // Fonction de déconnexion
export async function logout() {
  await supabase.auth.signOut();
  console.log("Déconnecté");
}

// // Récupérer l’utilisateur connecté
const authModel = {
  signup,
  login,
  logout,
};

export default authModel;
