// src/pages/modal.js

import { fetchWorks, fetchCategories } from "../utils/api.js";
import { createGalleryItem } from "../components/gallery.js";
import { handleImageChange } from "../utils/imageHandler.js";
import { handleProjectFormSubmit } from "../utils/formHandler.js";

export function initializeModal() {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("closeModalButton");
  const modifyButton = document.querySelector(".modify-edit-mode button");
  const addPhotoButton = document.getElementById("addPhotoButton");
  const backToGalleryButton = document.getElementById("backToGalleryButton");
  const galleryView = document.getElementById("gallery-view");
  const addPhotoView = document.getElementById("add-photo-view");
  const projectForm = document.getElementById("projectForm");
  const imageGallery = document.getElementById("imageGallery");
  const projectCategory = document.getElementById("projectCategory");
  const projectImageInput = document.getElementById("projectImage");
  const addPhotoBox = document.getElementById("addPhotoBox");
  const initialAddPhotoBoxContent = addPhotoBox.innerHTML;

  // Ouvre la modale et charge les données
  function openModal() {
    modal.style.display = "block";
    showGalleryView();
    fetchData();
    fetchCategoriesInModal();
  }

  // Ferme la modale
  function closeModal() {
    modal.style.display = "none";
  }

  // Affiche la vue de la galerie
  function showGalleryView() {
    galleryView.classList.add("active");
    addPhotoView.classList.remove("active");
    backToGalleryButton.style.visibility = "hidden";
  }

  // Affiche la vue pour ajouter une photo
  function showAddPhotoView() {
    galleryView.classList.remove("active");
    addPhotoView.classList.add("active");
    backToGalleryButton.style.visibility = "visible";
  }

  // Récupère et affiche les travaux
  async function fetchData() {
    try {
      const works = await fetchWorks();
      displayWorksInModal(works);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  // Affiche les travaux dans la modale
  function displayWorksInModal(works) {
    imageGallery.innerHTML = "";
    works.forEach((work) => createGalleryItem(work, imageGallery));
  }

  // Récupère et affiche les catégories dans la modale
  async function fetchCategoriesInModal() {
    try {
      const categories = await fetchCategories();
      projectCategory.innerHTML =
        '<option value="" disabled selected></option>';
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        projectCategory.appendChild(option);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  }

  // Les gestionnaires d'événements
  projectForm.addEventListener("submit", (event) =>
    handleProjectFormSubmit(
      event,
      projectForm,
      projectImageInput,
      showGalleryView,
      displayWorksInModal
    )
  );

  projectImageInput.addEventListener("change", (event) =>
    handleImageChange(
      event,
      addPhotoBox,
      initialAddPhotoBoxContent,
      projectImageInput
    )
  );

  modifyButton.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });

  closeModalButton.addEventListener("click", closeModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  addPhotoButton.addEventListener("click", showAddPhotoView);
  backToGalleryButton.addEventListener("click", showGalleryView);
}
