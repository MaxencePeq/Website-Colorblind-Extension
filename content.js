chrome.runtime.onMessage.addListener(function (message) {
  // Récupération du message et application du filtre.
  if (message.type === "appliquerProfil") {
    appliquerFiltre(message.profil);
  }

  // Supprime le filtre SVG et retire le style appliqué
  function supprimerFiltre() {
    const svg = document.getElementById("daltonisme-svg-filter");
    if (svg) svg.remove();
    document.documentElement.style.filter = "";
  }

  if (message.type === "reset") {
    supprimerFiltre();
    // location.reload();
  }
});
