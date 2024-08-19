// src/pages/login.js

export function updateLoginButton(isLoggedIn) {
  const loginButton = document.querySelector(".login-button");
  loginButton.textContent = isLoggedIn ? "logout" : "login";
  loginButton.href = isLoggedIn ? "#" : "login.html";
}

export function handleLogout(event) {
  event.preventDefault();
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("token");
  updateLoginButton(false);
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const loginButton = document.querySelector(".login-button");
  const errorMessage = document.getElementById("error-message");

  const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";

  if (isLoggedIn()) {
    updateLoginButton(true);
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        const response = await fetch("http://127.0.0.1:5678/api/users/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Erreur de connexion");

        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", "true");

        updateLoginButton(true);
        window.location.href = "index.html";
      } catch (error) {
        errorMessage.style.display = "block";
      }
    });
  }

  loginButton.addEventListener("click", (event) => {
    if (isLoggedIn()) {
      handleLogout(event);
    }
  });
});
