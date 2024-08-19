// src/utils/api.js

export async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des travaux");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories/");
    if (!response.ok)
      throw new Error("Erreur lors de la récupération des catégories");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fonction pour gérer la connexion de l'utilisateur
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
    throw error; // Rejeter l'erreur pour la gérer dans le gestionnaire de soumission
  }
}

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
