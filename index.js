const counterDisplay = document.querySelector("h3"); // Sélectionner l’élément avec la classe counter-display pour créer un compteur
let compteur = 0; // Initialiser le compteur à 0

const bubbleMaker = () => {
  const bubble = document.createElement("span"); // Créer un élément span
  bubble.classList.add("bubble"); // Ajouter une classe à l’élément span
  document.body.appendChild(bubble); // Ajouter l’élément span au body

  const size = Math.random() * 200 + 100 + "px"; // Générer une taille aléatoire
  bubble.style.height = size; // Appliquer la taille à l’élément span
  bubble.style.width = size; // Appliquer la taille à l’élément span

  bubble.style.top = Math.random() * 100 + 50 + "%"; // Positionner l’élément span aléatoirement dans le body vercialement
  bubble.style.left = Math.random() * 100 + "%"; // Positionner l’élément span aléatoirement dans le body horizontalement

  const plusMinus = Math.random() > 0.5 ? 1 : -1; // Générer un nombre aléatoire entre -1 et 1
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%"); // Positionner l’élément span aléatoirement dans l’élément span horizontalement

  bubble.addEventListener("click", () => {
    compteur++; // Incrémenter le compteur de 1 après un clic
    counterDisplay.textContent = compteur; // Agrémente le compteur dans l’élément h3
    bubble.remove(); // Supprimer l’élément span après un clic

    if (compteur >= 30) {
      clearInterval(intervalId); // Arrêter le jeu une fois que le compteur atteint 30
    }
  });
  setTimeout(() => {
    bubble.remove(); // Supprimer l’élément span après 4 secondes
  }, 8000);
};

let intervalId = setInterval(bubbleMaker, 1000); // Appeler la fonction bubbleMaker toutes les 300 millisecondes
