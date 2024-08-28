import { createGalleryItem } from "../components/gallery.js";
import { handleProjectFormSubmit } from "../utils/formHandler.js";
import { handleImagePreview } from "../utils/imagePreview.js";

export function initializeModal(works = [], categories = []) {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("closeModalButton");
  const modifyButton = document.getElementById("openModalButton");
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

  // Gestion de l'affichage de la modale
  function toggleModal(display) {
    modal.style.display = display ? "block" : "none";
    if (display) {
      showGalleryView();
      displayWorksInModal(works);
      populateCategories(categories);
    }
  }

  // Gestion de l'affichage des vues (galerie ou ajout de photo)
  function toggleView(isGalleryView) {
    galleryView.classList.toggle("active", isGalleryView);
    addPhotoView.classList.toggle("active", !isGalleryView);
    backToGalleryButton.style.visibility = isGalleryView ? "hidden" : "visible";
  }

  function showGalleryView() {
    toggleView(true);
  }

  function showAddPhotoView() {
    toggleView(false);
  }
  // Affiche les travaux dans la modale
  function displayWorksInModal(works) {
    imageGallery.innerHTML = "";
    works.forEach((work) => createGalleryItem(work, imageGallery));
  }

  // Remplit les catégories dans le select
  function populateCategories(categories) {
    projectCategory.innerHTML = '<option value="" disabled selected></option>';
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      projectCategory.appendChild(option);
    });
  }

  // Gestionnaires d'événements
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
    handleImagePreview(
      event,
      addPhotoBox,
      initialAddPhotoBoxContent,
      projectImageInput
    )
  );

  modifyButton.addEventListener("click", (event) => {
    event.preventDefault();
    toggleModal(true);
  });

  closeModalButton.addEventListener("click", () => toggleModal(false));
  window.addEventListener("click", (event) => {
    if (event.target === modal) toggleModal(false);
  });

  addPhotoButton.addEventListener("click", showAddPhotoView);
  backToGalleryButton.addEventListener("click", showGalleryView);
}
