export function imagePreview(projectImageInputId, addPhotoBoxId) {
  const projectImageInput = document.getElementById(projectImageInputId);
  const addPhotoBox = document.getElementById(addPhotoBoxId);
  const initialAddPhotoBoxContent = addPhotoBox.innerHTML;

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
}
