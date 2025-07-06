window.onload = () => {
  fetch("/components/header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;
      const toggleBtn = document.querySelector(".nav-toggle");
      const navList = document.getElementById("nav-list");
      toggleBtn.addEventListener("click", (e) => {
        toggleBtn.innerHTML = toggleBtn.textContent === "☰" ? "✖" : "☰";
        navList.classList.toggle("hidden");
        navList.classList.toggle("nav-collapse");
      });
    });
};
