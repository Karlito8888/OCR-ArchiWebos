document.addEventListener("DOMContentLoaded", () => {
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

  if (!projectImageInput) {
    console.error("Element with id 'projectImage' not found");
    return;
  }

  // Fonction pour ouvrir la modale
  function openModal() {
    modal.style.display = "block";
    showGalleryView(); // Afficher la vue de la galerie par défaut
    fetchData(); // Charger les travaux existants
    fetchCategories();
  }

  // Fonction pour fermer la modale
  function closeModal() {
    modal.style.display = "none";
  }

  // Fonction pour afficher la vue Galerie
  function showGalleryView() {
    galleryView.classList.add("active");
    addPhotoView.classList.remove("active");
    backToGalleryButton.style.visibility = "hidden";
  }

  // Fonction pour afficher la vue Ajouter Photo
  function showAddPhotoView() {
    galleryView.classList.remove("active");
    addPhotoView.classList.add("active");
    backToGalleryButton.style.visibility = "visible";
  }

  // Fonction pour récupérer et afficher les travaux
  function fetchData() {
    fetch("http://localhost:5678/api/works/")
      .then((response) => response.json())
      .then((data) => {
        displayWorks(data); // Afficher tous les travaux initialement
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }

  // Fonction pour afficher les travaux dans la galerie
  function displayWorks(works) {
    imageGallery.innerHTML = ""; // Effacer le contenu existant
    works.forEach((work) => {
      createGalleryItem(work); // Ajouter chaque travail à la galerie
    });
  }

  // Fonction pour créer un élément de galerie
  function createGalleryItem(item) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = item.imageUrl;

    // Création de l'icône de corbeille
    const deleteIcon = document.createElement("div");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = `<img src="./assets/icons/trash-can-solid.svg" alt="Supprimer">`;

    // Ajoutez l'ID du travail comme attribut de données
    deleteIcon.setAttribute("data-id", item.id);

    // Ajout de l'événement de suppression
    deleteIcon.addEventListener("click", async () => {
      const workId = deleteIcon.getAttribute("data-id");

      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${workId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du projet");
        }

        // Suppression réussie, retirer l'élément du DOM
        figure.remove();
        console.log(`Projet ${workId} supprimé avec succès`);
      } catch (error) {
        console.error("Erreur:", error);
      }
    });

    figure.appendChild(deleteIcon); // Ajouter l'icône à la figure
    figure.appendChild(img);
    imageGallery.appendChild(figure);
  }

  // Ouvrir la modale quand le bouton "modifier" est cliqué
  modifyButton.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });

  // Fermer la modale quand l'utilisateur clique sur la croix
  closeModalButton.addEventListener("click", closeModal);

  // Fermer la modale quand l'utilisateur clique en dehors de la modale
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Ouvrir la vue Ajouter Photo lorsque le bouton "Ajouter une Photo" est cliqué
  addPhotoButton.addEventListener("click", () => {
    showAddPhotoView();
  });

  // Revenir à la vue Galerie lorsque le bouton "Retour à la Galerie" est cliqué
  backToGalleryButton.addEventListener("click", () => {
    showGalleryView();
  });

  // Fonction pour récupérer et afficher les catégories dans le select
  function fetchCategories() {
    fetch("http://localhost:5678/api/categories/")
      .then((response) => response.json())
      .then((categories) => {
        projectCategory.innerHTML =
          '<option value="" disabled selected></option>';
        categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          projectCategory.appendChild(option);
        });
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories:", error)
      );
  }

  // Soumettre le formulaire et ajouter un nouveau projet
  projectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("projectTitle").value;
    const imageFile = projectImageInput.files[0];
    const category = document.getElementById("projectCategory").value;

    // Vérification du format et de la taille de l'image
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(imageFile.type)) {
      alert("Veuillez sélectionner une image au format JPG ou PNG.");
      return;
    }
    if (imageFile.size > 4 * 1024 * 1024) {
      // 4 Mo
      alert("La taille de l'image ne doit pas dépasser 4 Mo.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile);
    formData.append("category", category);

    try {
      const response = await fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du projet");
      }

      const data = await response.json();
      console.log("Projet ajouté avec succès:", data);

      // Ajouter le nouveau projet à la galerie
      createGalleryItem(data);

      // Réinitialiser le formulaire
      projectForm.reset();
      showGalleryView(); // Retourner à la vue Galerie
    } catch (error) {
      console.error("Erreur:", error);
    }
  });

  projectImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Vider le contenu de addPhotoBox
        addPhotoBox.innerHTML = "";
        addPhotoBox.classList.add("no-padding");

        // Créer un élément img pour l'aperçu de la photo
        const photoPreview = document.createElement("img");
        photoPreview.src = e.target.result;
        photoPreview.style.width = "auto";
        photoPreview.style.height = "170px";

        // Création de l'icône de corbeille
        const deleteIcon = document.createElement("div");
        deleteIcon.classList.add("delete-icon");
        deleteIcon.innerHTML = `<img src="./assets/icons/trash-can-solid.svg" alt="Supprimer">`;

        // Ajout de l'événement de suppression
        deleteIcon.addEventListener("click", () => {
          addPhotoBox.innerHTML = initialAddPhotoBoxContent;
          addPhotoBox.classList.remove("no-padding");
          projectImageInput.value = ""; // Réinitialiser l'input file
        });

        addPhotoBox.appendChild(photoPreview);
        addPhotoBox.appendChild(deleteIcon); // Ajouter l'icône de suppression après la photo
      };
      reader.readAsDataURL(file);
    }
  });
});
