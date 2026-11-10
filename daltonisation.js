// intensite entre 0 et 1 : mélange entre la page d'origine (0) et la correction complète (1).
function appliquerFiltre(profil, intensite = 1) {
  // Matrices de correction (daltonisation), précalculées : C = I + E·(I − S)
  //  S = simulation de la dichromatie (Machado, Oliveira & Fernandes 2009, sévérité 1.0)
  //  E = redistribution de l'info perdue (Fidaner) : rouge/vert -> vert + bleu, bleu/jaune -> rouge + vert
  // Valables en RGB linéaire, l'espace par défaut des filtres SVG.
  // Chaque ligne = un canal de sortie (R, V, B) calculé à partir de R, V, B.
  const matrices = {
    protanopie: [
      [1.0, 0.0, 0.0],
      [0.479, 0.477, 0.044],
      [0.597, -0.689, 1.091],
    ],
    deuteranopie: [
      [1.0, 0.0, 0.0],
      [0.163, 0.725, 0.112],
      [0.455, -0.645, 1.191],
    ],
    tritanopie: [
      [0.741, -0.407, 0.666],
      [0.075, 0.585, 0.34],
      [0.0, 0.0, 1.0],
    ],
  };

  // Intensité : C(t) = (1 − t)·I + t·C, coefficient par coefficient (I = identité : 1 sur la diagonale).
  const melange = matrices[profil].map((ligne, i) =>
    ligne.map((c, j) => (1 - intensite) * (i === j ? 1 : 0) + intensite * c),
  );

  // feColorMatrix attend 4 lignes de 5 valeurs (R, V, B, alpha, décalage) : on complète avec des 0
  // et on ajoute la ligne alpha, qui ne change pas.
  const values = [...melange.map((ligne) => [...ligne, 0, 0]), [0, 0, 0, 1, 0]]
    .map((ligne) => ligne.join(" "))
    .join("\n");

  supprimerFiltre();

  // On crée un SVG invisible avec le filtre dedans
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style = "position:absolute; width:0; height:0; overflow:hidden;";
  svg.id = "daltonisme-svg-filter";
  svg.innerHTML = `
        <defs>
        <!-- feColorMatrix change les couleurs d'un élément en fonction d'une matrice de transformation
         et MATRIX superpose 
         voir doc : https://developer.mozilla.org/fr/docs/Web/SVG/Reference/Element/feColorMatrix -->
            <filter id="daltonisme-filter">
                <feColorMatrix type="matrix" values="${values}"/>
            </filter>
        </defs>
    `;

  document.body.appendChild(svg);

  //J'applique le filtre sur toute la page
  document.documentElement.style.filter = "url(#daltonisme-filter)";
}

// Supprime le filtre SVG et retire le style appliqué
function supprimerFiltre() {
  const svg = document.getElementById("daltonisme-svg-filter");
  if (svg) svg.remove();
  document.documentElement.style.filter = "";
}
