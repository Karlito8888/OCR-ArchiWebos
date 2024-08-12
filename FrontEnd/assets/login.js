document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const loginButton = document.querySelector('nav ul li a[href="login.html"]');
  const errorMessage = document.getElementById("error-message");

  // Vérifie si l'utilisateur est déjà connecté
  if (localStorage.getItem("loggedIn") === "true") {
    loginButton.textContent = "logout";
    loginButton.href = "#";
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://127.0.0.1:5678/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Erreur de connexion");
      }

      const data = await response.json();
      console.log("Connexion réussie:", data);

      // Sauvegarder le token dans localStorage
      localStorage.setItem("token", data.token);

      // Sauvegarder l'état de connexion dans localStorage
      localStorage.setItem("loggedIn", "true");

      // Modifier le bouton login en logout et activer le mode édition
      loginButton.textContent = "logout";
      loginButton.href = "#";

      // Rediriger vers index.html
      window.location.href = "index.html";
    } catch (error) {
      // Affiche un message d'erreur à l'utilisateur
      //   console.error("Erreur:", error);
      errorMessage.style.display = "block";
    }
  });

  // Gestion du clic sur le bouton logout
  loginButton.addEventListener("click", (event) => {
    if (localStorage.getItem("loggedIn") === "true") {
      event.preventDefault();
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      loginButton.textContent = "login";
      loginButton.href = "login.html";
    }
  });
});
