import { applyUserLayout } from "./utils/layout.js";
import { fetchWorks } from "./utils/api.js";
import { initializeModal } from "./pages/modal.js";
import { updateLoginButton, handleLogout } from "./pages/login.js";
import {
  createCategoryButtons,
  setActiveButton,
} from "./components/categories.js";
import { displayWorks } from "./components/gallery.js";

const isLoggedIn = () => localStorage.getItem("loggedIn") === "true";

document.addEventListener("DOMContentLoaded", async () => {
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

  applyUserLayout(loggedIn);

  // On récupère les travaux et les catégories à partir d'un seul appel API
  const { works, categories } = await fetchWorks();
  displayWorks(works);

  createCategoryButtons(categories, works, displayWorks);
  setActiveButton(document.querySelector(".categories button"));

  initializeModal(works, categories);
});
