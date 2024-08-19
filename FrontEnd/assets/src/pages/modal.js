// src/pages/modal.js

import { fetchWorks, fetchCategories, addWork } from "../utils/api.js";
import { createGalleryItem } from "../components/gallery.js";
import { addProject } from "../utils/addProject.js"

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

  // Votre code pour ouvrir, fermer la modale et autres fonctions
  function openModal() {
    modal.style.display = "block";
    showGalleryView(); // Afficher la vue de la galerie par défaut
    fetchData(); // Charger les travaux existants
    fetchCategoriesInModal();
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showGalleryView() {
    galleryView.classList.add("active");
    addPhotoView.classList.remove("active");
    backToGalleryButton.style.visibility = "hidden";
  }

  function showAddPhotoView() {
    galleryView.classList.remove("active");
    addPhotoView.classList.add("active");
    backToGalleryButton.style.visibility = "visible";
  }

  // Fonction pour récupérer et afficher les travaux
  async function fetchData() {
    try {
      const works = await fetchWorks();
      displayWorksInModal(works); // Afficher tous les travaux initialement
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  function displayWorksInModal(works) {
    imageGallery.innerHTML = "";
    works.forEach((work) => createGalleryItem(work, imageGallery));
  }

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

  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("projectTitle").value;
    const imageFile = projectImageInput.files[0];
    const category = document.getElementById("projectCategory").value;

    if (!title || !imageFile || !category) {
      alert("Veuillez remplir tous les champs.");
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
    formData.append("title", title);
    formData.append("image", imageFile);
    formData.append("category", category);

    try {
      // Appeler la fonction addWork pour ajouter le projet
      const data = await addWork(formData);
      console.log("Projet ajouté avec succès:", data);

      // Récupérer la liste mise à jour des projets
      const updatedWorks = await fetchWorks();

      // Mettre à jour la galerie avec les projets récupérés
      displayWorksInModal(updatedWorks);

      projectForm.reset();
      showGalleryView();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue lors de l'ajout du projet.");
    }
  });

  projectImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        addPhotoBox.innerHTML = "";
        addPhotoBox.classList.add("no-padding");

        const photoPreview = document.createElement("img");
        photoPreview.src = e.target.result;
        photoPreview.style.height = "170px";

        const deleteIcon = document.createElement("div");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerHTML = `<img src="./assets/icons/trash-can-solid.svg" alt="Supprimer">`;
        deleteIcon.addEventListener("click", () => {
          addPhotoBox.innerHTML = initialAddPhotoBoxContent;
          addPhotoBox.classList.remove("no-padding");
          projectImageInput.value = ""; // Réinitialiser l'input file
        });

        addPhotoBox.append(photoPreview, deleteIcon);
      };
      reader.readAsDataURL(file);
    }
  });

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
