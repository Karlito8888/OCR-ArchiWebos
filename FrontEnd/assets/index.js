document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const categoriesContainer = document.querySelector(".categories");
  const loginButton = document.querySelector(".login-button");
  const headerContainer = document.querySelector(".header-container");
  const editModeHeader = document.querySelector("header .edit-mode");
  const modifyEditMode = document.querySelector(".modify-edit-mode");

  let works = [];
  let categories = [];
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  let allButton;

  function applyUserLayout() {
    const isLoggedIn = loggedIn;
    editModeHeader.style.height = isLoggedIn ? "59px" : "0";
    headerContainer.style.margin = isLoggedIn
      ? "38px auto 92px"
      : "50px auto 139px";
    loginButton.textContent = isLoggedIn ? "logout" : "login";
    loginButton.href = isLoggedIn ? "#" : "login.html";
    modifyEditMode.style.display = isLoggedIn ? "block" : "none";
    categoriesContainer.style.display = isLoggedIn ? "none" : "flex";
    gallery.style.marginTop = isLoggedIn ? "92px" : "0";
  }

  // Fonction pour créer et ajouter les figures dans la galerie
  function createGalleryItem(item) {
    const figure = document.createElement("figure");
    figure.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.title}">
      <figcaption>${item.title}</figcaption>
    `;
    gallery.appendChild(figure);
  }

  // Crée les boutons de catégories
  function createCategoryButtons(categories) {
    const createButton = (text, callback) => {
      const button = document.createElement("button");
      button.textContent = text;
      button.addEventListener("click", callback);
      return button;
    };

    allButton = createButton("Tous", () => {
      setActiveButton(allButton);
      displayWorks(works);
    });
    categoriesContainer.appendChild(allButton);
    allButton.classList.add("active");

    categories.forEach((category) => {
      const button = createButton(category.name, () => {
        setActiveButton(button);
        filterWorksByCategory(category.id);
      });
      categoriesContainer.appendChild(button);
    });
  }

  // Définit le bouton actif
  function setActiveButton(activeButton) {
    categoriesContainer
      .querySelectorAll("button")
      .forEach((btn) => btn.classList.remove("active"));
    activeButton.classList.add("active");
  }

  // Fonction pour afficher les travaux
  function displayWorks(worksToDisplay) {
    gallery.innerHTML = ""; // Clear existing works
    worksToDisplay.forEach(createGalleryItem);
  }

  // Fonction pour filtrer les travaux par catégorie
  function filterWorksByCategory(categoryId) {
    displayWorks(works.filter((work) => work.categoryId === categoryId));
  }

  // Récupère les données de l'API
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5678/api/works/");
      works = await response.json();
      displayWorks(works);

      const categoryIds = [...new Set(works.map((work) => work.categoryId))];
      categories = categoryIds.map(
        (id) => works.find((work) => work.category.id === id).category
      );
      createCategoryButtons(categories);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  // Initialisation
  applyUserLayout();
  fetchData();

  // Gestion du clic sur le bouton logout
  loginButton.addEventListener("click", (event) => {
    if (loggedIn) {
      event.preventDefault();
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("token");
      window.location.href = "login.html";
      applyUserLayout();
    }
  });
});
