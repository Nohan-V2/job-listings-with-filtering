document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category li");
  const categoryCheckedContainer = document.querySelector(".choose-category");
  const clearButton = document.querySelector(".bouton-clear");
  const containers = document.querySelectorAll(".container");

  // Fonction pour afficher tous les conteneurs
  function showAllContainers() {
    containers.forEach((container) => {
      container.style.display = "flex"; // Affiche tous les conteneurs
    });
  }

  // Fonction pour réinitialiser la sélection des catégories
  function resetCategorySelection() {
    // Supprime toutes les catégories sélectionnées
    Array.from(
      categoryCheckedContainer.querySelectorAll(".category-checked")
    ).forEach((element) => element.remove());
  }

  // Fonction pour mettre à jour les containers affichés
  function updateContainerDisplay() {
    const selectedCategories = Array.from(
      categoryCheckedContainer.querySelectorAll(".name-category")
    ).map((nameCategory) => nameCategory.textContent);

    // Si aucune catégorie n'est sélectionnée, afficher tous les conteneurs
    if (selectedCategories.length === 0) {
      showAllContainers();
      return;
    }

    // Sinon, afficher uniquement les conteneurs correspondant à toutes les catégories sélectionnées
    containers.forEach((container) => {
      const containerCategories = Array.from(
        container.querySelectorAll(".category li")
      ).map((li) => li.textContent);

      if (
        selectedCategories.every((cat) => containerCategories.includes(cat))
      ) {
        container.style.display = "flex";
      } else {
        container.style.display = "none";
      }
    });
  }

  // Fonction pour ajouter une catégorie sélectionnée
  function addCategory(selectedCategory) {
    // Vérifie si la catégorie est déjà sélectionnée
    const existingCategory = Array.from(
      categoryCheckedContainer.querySelectorAll(".name-category")
    ).find((nameCategory) => nameCategory.textContent === selectedCategory);

    if (existingCategory) return;

    // Crée un nouvel élément .name-category
    const nameCategoryElement = document.createElement("div");
    nameCategoryElement.classList.add("category-checked");
    nameCategoryElement.innerHTML = `
            <p class="name-category">${selectedCategory}</p>
            <img class="cross-category" src="./images/cross.svg" alt="Remove category" />
        `;

    // Ajoute l'élément à la liste
    categoryCheckedContainer.insertBefore(nameCategoryElement, clearButton);

    // Ajoute l'événement de suppression individuelle
    nameCategoryElement
      .querySelector(".cross-category")
      .addEventListener("click", () => {
        nameCategoryElement.remove();
        updateContainerDisplay();
      });

    updateContainerDisplay();
  }

  // Gestion de la sélection d'une catégorie
  categories.forEach((category) => {
    category.addEventListener("click", () => {
      const selectedCategory = category.textContent;
      addCategory(selectedCategory);
    });
  });

  // Réinitialisation avec le bouton "Clear"
  clearButton.addEventListener("click", () => {
    resetCategorySelection();
    showAllContainers();
  });

  // Réinitialisation complète au chargement de la page
  resetCategorySelection();
  showAllContainers();
});
