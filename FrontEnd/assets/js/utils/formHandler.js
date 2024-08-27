// src/utils/formHandler.js

import { fetchWorks, addWork } from "./api.js";

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
    // Appeler la fonction addWork pour ajouter le projet
    const data = await addWork(formData);
    console.log("Projet ajouté avec succès:", data);

    // Récupérer la liste mise à jour des projets
    const { works: updatedWorks } = await fetchWorks();

    // Mettre à jour la galerie avec les projets récupérés
    displayWorksInModal(updatedWorks);

    projectForm.reset();
    showGalleryView();
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue lors de l'ajout du projet.");
  }
}
