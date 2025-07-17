window.addEventListener("load", () => {
  loadHeader();
  getUser();
});

const loadHeader = async () => {
  try {
    const res = await fetch("/components/header.html");
    const html = await res.text();
    document.getElementById("navbar").innerHTML = html;

    // Attends que le DOM soit prêt
    requestAnimationFrame(() => {
      const toggleBtn = document.querySelector(".nav-toggle");
      const navList = document.getElementById("nav-list");
      const menuIcon = toggleBtn?.querySelector(".menuIcon");

      if (!toggleBtn || !navList || !menuIcon) return;

      let isOpen = false;

      toggleBtn.addEventListener("click", () => {
        navList.classList.toggle("hidden");
        navList.classList.toggle("nav-collapse");

        menuIcon.src = isOpen
          ? "../assets/icon-menu.svg"
          : "../assets/icon-close.svg";

        menuIcon.alt = isOpen ? "Menu Icon" : "Close Menu Icon";
        isOpen = !isOpen;
      });
      console.log(getUser());

      // ✅ Ajout du listener logout ici
      document.getElementById("logout").addEventListener("click", async () => {
        try {
          const response = await fetch("/api/auth/logout", {
            method: "GET",
            credentials: "include", // ⚠️ Important pour que les cookies soient envoyés
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await response.json();

          if (!response.ok) {
            console.warn(
              result.message || "Erreur lors de la récupération utilisateur."
            );
          } else {
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Erreur réseau :", error.message);
        }
        document.getElementById("status").textContent = "Déconnecté";
      });
    });
  } catch (error) {
    console.error("Erreur dans loadHeader :", error);
  }
};
const getUser = async () => {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      credentials: "include", // ⚠️ Important pour que les cookies soient envoyés
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      document.getElementById("login").classList.remove("hidden");
      document.getElementById("logout").classList.add("hidden");
      document.getElementById("account").classList.add("hidden");
      document.querySelector(".signUpBtn").classList.remove("hidden");
      document.querySelector(".titleSection").classList.add("hidden");
    } else {
      const pseudo = result.pseudo || result.email;
      document.querySelector(
        ".titleSection"
      ).textContent = `Bienvenue ${pseudo}`;
      document.getElementById("login").classList.add("hidden");
      document.getElementById("logout").classList.remove("hidden");
      document.querySelector(".signUpBtn").classList.add("hidden");
    }
  } catch (error) {
    console.error("Erreur réseau :", error.message);
  }
};
