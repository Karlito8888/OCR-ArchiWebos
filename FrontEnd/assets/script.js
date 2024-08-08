document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const categoriesContainer = document.querySelector('.categories');
    let works = [];
    let categories = [];

    // Fonction pour créer et ajouter les figures dans la galerie
    function createGalleryItem(item) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = item.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }

     // Fonction pour créer les boutons de catégories
    function createCategoryButtons(categories) {
        categoriesContainer.innerHTML = ''; // Clear existing buttons
        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.classList.add('active'); // Activer le bouton "Tous" par défaut
        allButton.addEventListener('click', () => {
            setActiveButton(allButton);
            displayWorks(works);
        });
        categoriesContainer.appendChild(allButton);


        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
             button.addEventListener('click', () => {
                setActiveButton(button);
                filterWorksByCategory(category.id);
            });
            categoriesContainer.appendChild(button);
        }); // Ajouter des gestionnaires d'événements pour le survol et le focus
        const buttons = categoriesContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => setActiveButton(button));
        });
    }

    // Fonction pour définir le bouton actif
    function setActiveButton(button) {
        const buttons = categoriesContainer.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    // Fonction pour afficher les travaux
    function displayWorks(worksToDisplay) {
        gallery.innerHTML = ''; // Clear existing works
        worksToDisplay.forEach(item => createGalleryItem(item));
    }

    // Fonction pour filtrer les travaux par catégorie
    function filterWorksByCategory(categoryId) {
        const filteredWorks = works.filter(work => work.categoryId === categoryId);
        displayWorks(filteredWorks);
    }

    // Fonction pour récupérer les données de l'API
   function fetchData() {
        fetch('http://localhost:5678/api/works/')
            .then(response => response.json())
            .then(data => {
                works = data; // Stocker les travaux récupérés
                displayWorks(works); // Afficher tous les travaux initialement

                // Extraire les catégories uniques en utilisant Set et les onvertir le Set en tableau.

                const categoryIds = [...new Set(works.map(work => work.categoryId))];
                categories = categoryIds.map(id => works.find(work => work.category.id === id).category);
                createCategoryButtons(categories);
            })
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
    }

    // Appeler la fonction pour récupérer les données
    fetchData();
});
