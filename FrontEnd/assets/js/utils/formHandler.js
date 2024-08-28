// src/utils/formHandler.js

import { fetchWorks, addWork } from "./api.js";
import { formState, updateButtonState } from "./formState.js";

function initializeTitleLogging() {
  const projectTitleInput = document.getElementById("projectTitle");

  projectTitleInput.addEventListener("input", (event) => {
    const title = event.target.value;
    formState.isTitleEntered = title.trim() !== ""; // Mettre à jour l'état
    updateButtonState(); // Vérifiez l'état du bouton
  });
}

function initializeCategoryTracking() {
  const projectCategorySelect = document.getElementById("projectCategory");

  projectCategorySelect.addEventListener("change", (event) => {
    formState.isCategorySelected = event.target.value !== ""; // Mettre à jour l'état
    updateButtonState(); // Vérifiez l'état du bouton
  });
}

export async function handleProjectFormSubmit(
  event,
  projectForm,
  projectImageInput,
  showGalleryView,
  displayWorksInModal
) {
  event.preventDefault();

  const imageFile = projectImageInput.files[0];
  const title = document.getElementById("projectTitle").value;
  const category = document.getElementById("projectCategory").value;

  if (!formState.isImageUploaded) {
    alert("Veuillez ajouter une image.");
    return;
  }
  if (!formState.isTitleEntered) {
    alert("Veuillez entrer un titre.");
    return;
  }
  if (!formState.isCategorySelected) {
    alert("Veuillez sélectionner une catégorie.");
    return;
  }

  if (!["image/jpeg", "image/png"].includes(imageFile.type)) {
    alert("Veuillez sélectionner une image au format JPG ou PNG.");
    return;
  }
  if (imageFile.size > 4 * 1024 * 1024) {
    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("title", title);
  formData.append("category", category);

  try {
    const data = await addWork(formData);
    console.log("Projet ajouté avec succès:", data);

    const { works: updatedWorks } = await fetchWorks();
    displayWorksInModal(updatedWorks);

    projectForm.reset();
    showGalleryView();
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue lors de l'ajout du projet.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTitleLogging();
  initializeCategoryTracking();
});
