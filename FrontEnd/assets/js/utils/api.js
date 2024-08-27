// src/utils/api.js

export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
    const works = await response.json();

    // Extraire les catégories des travaux
        // 'stringify' convertit en chaînes de caractères
        // 'Set' supprime les doublons
        // 'parse' convertit les chaînes en objet JavaScript
        // 'Array.from' convertit le Set en tableau
    const categories = Array.from(
      new Set(works.map((work) => JSON.stringify(work.category)))
    ).map((category) => JSON.parse(category));

    // console.log("Catégories:", categories);

    return { works, categories };
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
    throw error;
  }
}

// Connexion de l'utilisateur
export async function loginUser(email, password) {
  try {
    const response = await fetch("http://127.0.0.1:5678/api/users/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Erreur de connexion");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Ajout d'un nouveau travail
export async function addWork(formData) {
  try {
    const response = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout du projet");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Suppression d'un travail
export async function deleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (!response.ok)
      throw new Error("Erreur lors de la suppression du projet");

    console.log(`Projet ${workId} supprimé avec succès`);
  } catch (error) {
    console.error("Erreur:", error);
  }
}
