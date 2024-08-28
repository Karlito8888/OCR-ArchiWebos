// src/utils/formState.js

export const formState = {
  isImageUploaded: false,
  isTitleEntered: false,
  isCategorySelected: false,
};

export function updateButtonState() {
  const submitButton = document.getElementById("submitPhotoButton");

  if (
    formState.isImageUploaded &&
    formState.isTitleEntered &&
    formState.isCategorySelected
  ) {
    submitButton.style.backgroundColor = "#1d6154"; // Changez la couleur selon vos préférences
  } else {
    submitButton.style.backgroundColor = ""; // Réinitialisez ou définissez la couleur par défaut
  }
}
