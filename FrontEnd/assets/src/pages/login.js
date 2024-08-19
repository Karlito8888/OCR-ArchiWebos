// src/pages/login.js

import { loginUser } from "../utils/api.js";

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

const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";

// Fonction pour initialiser la page de connexion
export function initializeLoginPage() {
  const form = document.getElementById("loginForm");
  const loginButton = document.querySelector(".login-button");
  const errorMessage = document.getElementById("error-message");

  if (isLoggedIn()) {
    updateLoginButton(true);
  }

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const data = await loginUser(email, password);
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", "true");

        updateLoginButton(true);
        window.location.href = "index.html";
      } else {
        errorMessage.style.display = "block";
      }
    });
  }

  loginButton.addEventListener("click", (event) => {
    if (isLoggedIn()) {
      handleLogout(event);
    }
  });
}

// Initialisation de la page de connexion lors du chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  initializeLoginPage();
});
