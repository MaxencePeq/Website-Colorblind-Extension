// appliquerFiltre et supprimerFiltre viennent de daltonisation.js (chargé avant via le manifest).

function appliquerProfil(profil) {
  if (profil && profil !== "aucun") {
    appliquerFiltre(profil);
  } else {
    supprimerFiltre();
  }
}

// Au chargement de la page : on applique le profil enregistré.
chrome.storage.local.get("profil", (data) => appliquerProfil(data.profil));

// Quand le profil change depuis le popup : on met à jour la page (tous les onglets ouverts).
chrome.storage.onChanged.addListener((changes) => {
  if (changes.profil) appliquerProfil(changes.profil.newValue);
});
