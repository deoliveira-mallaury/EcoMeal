document.querySelector(".signupLink").addEventListener("click", function () {
  document.querySelector(".signupSect").classList.remove("hidden");
  document.querySelector(".loginSect").classList.add("hidden");
  document.querySelector(".formTitle").textContent = "Inscription";
});
document
  .querySelector(".bi-arrow-left-circle")
  .addEventListener("click", function (e) {
    document.querySelector(".signupSect").classList.add("hidden");
    document.querySelector(".loginSect").classList.remove("hidden");
    document.querySelector(".formTitle").textContent = "Connexion";
  });
const loginform = document.querySelector(".loginForm");
const signupForm = document.querySelector(".signupForm");
const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{10,}$/;
// console.log(signupForm["name"]);

const statusError = true;
// // signup in BDD form
document.querySelector(".signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const signupForm = document.querySelector(".signupForm");
  const pseudo = signupForm["pseudo"].value;
  const lastname = signupForm["lastname"].value;
  const name = signupForm["name"].value;
  const phone = signupForm["phone"].value;
  const location = signupForm["location"].value;
  const avatar = signupForm["avatar"].value;
  const email = signupForm["emailSignup"].value;
  const pass = signupForm["passSignup"].value;
  const confirmPass = signupForm["confirmPass"].value;
  const errorContainer = document.querySelector(".errorForm");

  const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{10,}$/;
  let errorMessage = "";
  console.log(email, pass, pseudo);

  if (!pass.match(passRegex)) {
    errorMessage +=
      "Mot de passe invalide ! Doit contenir 10 caractères avec majuscule, minuscule et un caractère spécial.<br>";
  }

  if (confirmPass !== pass) {
    errorMessage += "Les mots de passe ne correspondent pas.<br>";
  }

  if (errorMessage !== "") {
    errorContainer.innerHTML = errorMessage;
    return;
  }

  // Envoi vers l'API pour créer un utilisateur
  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
        pseudo: pseudo,
        name: name,
        lastname: lastname,
        phone: phone,
        location: location,
        avatar: avatar,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      errorContainer.innerHTML =
        result.message || "Erreur lors de l'inscription.";
    } else {
      errorContainer.innerHTML = "";
      document.querySelector(".result").textContent =
        "✅ Utilisateur inscrit avec succès !";
      signupForm.reset();
    }
  } catch (error) {
    errorContainer.innerHTML = "Erreur réseau : " + error.message;
  }
});

// // login function send to homepage with user name
loginform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginform["email"].value;
  const pass = loginform["pass"].value;
  const errorContainer = document.querySelector(".errorForm");
  let errorMessage = "";
  try {
    const response = await fetch("/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    if (!response.ok) {
      errorContainer.innerHTML =
        result.message || "Erreur lors de la connexion.";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    errorContainer.innerHTML = "Erreur réseau : " + error.message;
  }
});

// // document.getElementById("logoutBtn").addEventListener("click", async () => {
// //   await logout();
// //   document.getElementById("status").textContent = "Déconnecté";
// // });
