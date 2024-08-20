// src/components/gallery.js

import { deleteWork } from "../utils/api.js";

export function displayWorks(works) {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = ""; // Clear existing content

  works.forEach((work) => {
    const workElement = document.createElement("div");
    workElement.classList.add("work");
    workElement.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <h3>${work.title}</h3>
    `;
    galleryContainer.appendChild(workElement);
  });
}

export function createGalleryItem(work, container) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = work.imageUrl;

  const deleteIcon = document.createElement("div");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = `<img src="./assets/icons/trash-can-solid.svg" alt="Supprimer">`;
  deleteIcon.setAttribute("data-id", work.id);

  deleteIcon.addEventListener("click", () => deleteWork(work.id, figure));

  figure.append(deleteIcon, img);
  container.appendChild(figure);
}
