// src/utils/imagePreview.js

import { formState, updateButtonState } from "./formState.js";

export function handleImagePreview(
  event,
  addPhotoBox,
  initialAddPhotoBoxContent,
  projectImageInput
) {
  const file = event.target.files[0];
  if (file) {
    formState.isImageUploaded = true; // Mettre à jour l'état
    updateButtonState(); // Vérifiez l'état du bouton

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
        formState.isImageUploaded = false; // Réinitialiser l'état
        updateButtonState(); // Vérifiez l'état du bouton
      });

      addPhotoBox.append(photoPreview, deleteIcon);
    };
    reader.readAsDataURL(file);
  }
}
