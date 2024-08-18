// src/utils/gallery.js

export function createGalleryItem(item) {
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  figure.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.title}">
    <figcaption>${item.title}</figcaption>
  `;
  gallery.appendChild(figure);
}

export function displayWorks(worksToDisplay) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Clear existing works
  worksToDisplay.forEach(createGalleryItem);
}
