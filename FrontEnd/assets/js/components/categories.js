// Sélecteur de conteneur de catégories
const categoriesContainer = document.querySelector(".categories");

// Fonction pour créer un bouton de catégorie
const createButton = (text, callback) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", callback);
  return button;
};

// Fonction pour filtrer les travaux par catégorie
const filterWorksByCategory = (categoryId, works, displayWorks) => {
  if (!works) {
    console.error("Les travaux ne sont pas définis.");
    return;
  }
  displayWorks(works.filter((work) => work.categoryId === categoryId));
};

// Fonction pour créer les boutons de catégories
export function createCategoryButtons(categories, works, displayWorks) {
  // Création et ajout du bouton "Tous"
  const allButton = createButton("Tous", () => {
    setActiveButton(allButton);
    displayWorks(works);
  });
  categoriesContainer.appendChild(allButton);
  allButton.classList.add("active");

  // Création et ajout des boutons pour chaque catégorie
  categories.forEach((category) => {
    const button = createButton(category.name, () => {
      setActiveButton(button);
      filterWorksByCategory(category.id, works, displayWorks);
    });
    categoriesContainer.appendChild(button);
  });
}

// Fonction pour mettre à jour le bouton actif
export function setActiveButton(activeButton) {
  const buttons = categoriesContainer.querySelectorAll("button");
  if (!buttons || buttons.length === 0) {
    console.error("Aucun bouton trouvé dans le conteneur de catégories.");
    return;
  }

  buttons.forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}
