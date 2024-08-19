import { addWork, fetchWorks } from "./api.js";
import { displayWorks } from "../components/gallery.js";

export async function addProject(event) {
  event.preventDefault();

   const title = document.getElementById("projectTitle").value;
   const projectImageInput = document.getElementById("projectImage");
   const category = document.getElementById("projectCategory").value;

   if (!projectImageInput) {
     console.error("L'élément d'entrée d'image n'a pas été trouvé.");
     return;
   }

   const imageFile = projectImageInput.files[0];

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
    displayWorks(updatedWorks);

    document.getElementById("projectForm").reset();
    document.getElementById("gallery-view").classList.add("active");
    document.getElementById("add-photo-view").classList.remove("active");
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue lors de l'ajout du projet.");
  }
}
