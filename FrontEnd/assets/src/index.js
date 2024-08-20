import { applyUserLayout } from "./utils/layout.js";
import { fetchWorks, fetchCategories } from "./utils/api.js";
import { initializeModal } from "./pages/modal.js";
import { updateLoginButton, handleLogout } from "./pages/login.js";
import {
  createCategoryButtons,
  setActiveButton,
} from "./components/categories.js";
import { displayWorks } from "./components/gallery.js";

// Fonction isLoggedIn
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

  // Initialisation
  applyUserLayout(loggedIn);

  // Fetch and display works and categories
  const works = await fetchWorks();
  displayWorks(works);

  const categories = await fetchCategories();
  createCategoryButtons(categories, works, displayWorks);
  setActiveButton(document.querySelector(".categories button"));

  initializeModal();
});
