// src/components/categories.js

let allButton;

export function createCategoryButtons(categories, works, displayWorks) {
  const categoriesContainer = document.querySelector(".categories");

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
      filterWorksByCategory(category.id, works, displayWorks);
    });
    categoriesContainer.appendChild(button);
  });
}

export function setActiveButton(activeButton) {
  const categoriesContainer = document.querySelector(".categories");

  categoriesContainer
    .querySelectorAll("button")
    .forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

function filterWorksByCategory(categoryId, works, displayWorks) {
  if (!works) {
    console.error("Les travaux (works) ne sont pas définis.");
    return;
  }
  const filteredWorks = works.filter((work) => work.categoryId === categoryId);
  displayWorks(filteredWorks);
}
