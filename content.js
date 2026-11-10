// appliquerFiltre et supprimerFiltre viennent de daltonisation.js (chargé avant via le manifest).

// intensite est stockée en pourcentage (0 à 100), 100 par défaut.
function appliquerReglages({ profil, intensite = 100 }) {
  if (profil && profil !== "aucun") {
    appliquerFiltre(profil, intensite / 100);
  } else {
    supprimerFiltre();
  }
}

function lireReglages() {
  chrome.storage.local.get(["profil", "intensite"], appliquerReglages);
}

// Au chargement de la page : on applique les réglages enregistrés.
lireReglages();

// Quand le profil ou l'intensité change depuis le popup : on met à jour la page (tous les onglets ouverts).
chrome.storage.onChanged.addListener((changes) => {
  if (changes.profil || changes.intensite) lireReglages();
});
