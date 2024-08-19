// src/utils/api.js

import { createCategoryButtons } from "../components/categories.js";
import { displayWorks } from "../components/gallery.js";

export async function fetchData() {
  let works = [];
  let categories = [];
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    works = await response.json();
    displayWorks(works);

    const categoryIds = [...new Set(works.map((work) => work.categoryId))];
    categories = categoryIds.map(
      (id) => works.find((work) => work.category.id === id).category
    );
    createCategoryButtons(categories, works, displayWorks);
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
  return { works, categories };
}
