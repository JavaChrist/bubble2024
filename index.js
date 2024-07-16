document.addEventListener("DOMContentLoaded", () => {
  let compteur = 0; // Initialiser le compteur à 0
  let scores = []; // Tableau pour stocker les scores de chaque partie
  let intervalId = null; // Déclarer intervalId pour pouvoir le contrôler plus tard
  let jeuActif = false;
  const counterDisplay = document.querySelector("h3");

  // Ajouter un écouteur d'événements au bouton start
  document.getElementById("startButton").addEventListener("click", () => {
    const userName = prompt(
      "Veuillez entrer votre prénom pour commencer la partie:"
    );
    if (userName) {
      compteur = 0; // Réinitialiser le compteur à chaque nouvelle partie
      startGame(); // Démarrer le jeu directement après que l'utilisateur ait entré son prénom
    } else {
      alert("Le prénom est nécessaire pour commencer la partie.");
    }
  });

  const playSound = () => {
    const audio = new Audio();
    audio.src = "ding.mp3";
    audio.play();
  };

  // Fonction pour gérer les clics sur les bulles
  const handleBubbleClick = (bubble) => {
    if (!jeuActif) return; // Ne rien faire si le jeu n'est pas actif
    compteur++;
    counterDisplay.textContent = compteur;
    playSound(); // Jouer le son lors de l'éclatement de la bulle
    bubble.remove(); // Supprimer la bulle
  };

  // Fonction pour créer une bulle
  const bubbleMaker = () => {
    if (!jeuActif) return;
    const bubble = document.createElement("span");
    bubble.classList.add("bubble");
    document.body.appendChild(bubble);

    const size = Math.random() * 200 + 100 + "px";
    bubble.style.height = size;
    bubble.style.width = size;

    bubble.style.top = Math.random() * 100 + 50 + "%";
    bubble.style.left = Math.random() * 100 + "%";

    const plusMinus = Math.random() > 0.5 ? 1 : -1;
    bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

    // Attacher handleBubbleClick à l'événement de clic de la bulle
    bubble.addEventListener("click", () => handleBubbleClick(bubble));

    setTimeout(() => {
      bubble.remove(); // Supprimer la bulle après un certain temps
    }, 8000);
  };

  // Fonction pour mettre à jour le tableau des scores
  const updateScoreboard = () => {
    const scoreboard = document.getElementById("scoreboard"); // Récupérer l'élément du tableau des scores
    scoreboard.innerHTML = ""; // Vider le tableau des scores actuels

    // Créer et ajouter un élément pour chaque score dans le tableau des scores
    scores.forEach((score, index) => {
      const scoreElement = document.createElement("li"); // Créer un nouvel élément de liste pour chaque score
      scoreElement.textContent = `Partie ${index + 1}: ${score}`; // Définir le texte de l'élément avec le score
      scoreboard.appendChild(scoreElement); // Ajouter l'élément de score au tableau des scores
    });
  };

  // Fonction appelée à la fin de chaque partie pour enregistrer le score et afficher un message
  const endGame = () => {
    jeuActif = false;
    console.log("Fin de la partie, score actuel : ", compteur); // Afficher le score actuel dans la console
    scores.push(compteur);
    updateScoreboard(); // Enregistrer le score actuel
    const maxScore = Math.max(...scores); // Trouver le meilleur score
    let message = "";

    if (compteur === maxScore && scores.length > 1) {
      message = "Bravo, record battu!";
    } else if (compteur < maxScore) {
      message = "Tu y es presque!";
    } else {
      message = "Bravo, meilleur score!";
    }
    document.getElementById("messageDisplay").textContent = message;

    activateShowScoresButton();
  };

  // Afficher le message à l'écran

  compteur = 0; // Réinitialiser le compteur pour la prochaine partie
  console.log("Le compteur a été réinitialisé pour la prochaine partie.");

  // Activez et affichez le bouton "Afficher les scores"
  function activateShowScoresButton() {
    console.log("Activation du bouton Afficher les scores");
    const showScoresBtn = document.getElementById("showScoresBtn");
    showScoresBtn.style.display = "block"; // Assurez-vous que le bouton est visible
    showScoresBtn.disabled = false; // Active le bouton
    console.log("État du bouton :", showScoresBtn.disabled); // Devrait afficher 'false'
  }
  // Fonction pour afficher le tableau des scores
  function showScores() {
    updateScoreboard();
    console.log("Avant d'afficher le scoreboard");
    document.getElementById("scoreboard").style.display = "block"; // Afficher le tableau des scores
    console.log("Après avoir affiché le scoreboard");
    document.getElementById("closeScoresBtn").style.display = "block"; // Afficher le bouton "Fermer"
  }
  document
    .getElementById("showScoresBtn")
    .addEventListener("click", showScores);

  // Fonction pour réinitialiser les scores
  document.getElementById("resetScoresBtn").addEventListener("click", () => {
    scores = []; // Réinitialiser le tableau des scores
    updateScoreboard(); // Mettre à jour l'affichage
  });

  // Fonction pour cacher le tableau des scores et les boutons
  document.getElementById("closeScoresBtn").addEventListener("click", () => {
    document.getElementById("scoreboard").style.display = "none"; // Cacher le tableau des scores
    document.getElementById("resetScoresBtn").style.display = "none"; // Cacher le bouton "Reset"
    document.getElementById("closeScoresBtn").style.display = "none"; // Cacher le bouton "Fermer"
  });

  // Fonction pour démarrer le jeu
  const startGame = () => {
    document.getElementById("messageDisplay").textContent = "";
    if (!jeuActif) {
      // Vérifier si le jeu n'est pas déjà en cours
      jeuActif = true; // Indiquer que le jeu a commencé
      compteur = 0; // Assurez-vous que le compteur est réinitialisé ici si nécessaire
      intervalId = setInterval(bubbleMaker, 300);
      setTimeout(() => {
        clearInterval(intervalId); // Arrêter la création de bulles après 20 secondes
        intervalId = null; // Réinitialiser intervalId pour permettre un nouveau démarrage
        endGame(); // Appeler endGame à la fin de la partie
      }, 20000); // Durée de la partie, ajustez selon le besoin
    }
  };

  // Ajouter un écouteur d'événements au bouton start
  document.getElementById("startButton").addEventListener("click", () => {
    console.log("Le bouton de démarrage a été cliqué."); // Afficher un message dans la console lorsque le bouton est cliqué
    startGame(); // Démarrer le jeu
  });
});
