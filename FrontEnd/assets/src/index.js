import { applyUserLayout } from "./utils/layout.js";
import { fetchData } from "./utils/api.js";
import { initializeModal } from "./utils/modal.js";
import { updateLoginButton, handleLogout } from "./login.js";

// Fonction isLoggedIn
const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login-button");
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    updateLoginButton(true);
  }

  loginButton.addEventListener("click", (event) => {
    if (loggedIn) {
      handleLogout(event);
    }
  });

  // Initialisation
  applyUserLayout(loggedIn);
  fetchData();
  initializeModal();
});
