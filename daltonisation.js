function appliquerFiltre(profil) {
  // Matrices de correction (daltonisation), précalculées : C = I + E·(I − S)
  //  S = simulation de la dichromatie (Machado, Oliveira & Fernandes 2009, sévérité 1.0)
  //  E = redistribution de l'info perdue (Fidaner) : rouge/vert -> vert + bleu, bleu/jaune -> rouge + vert
  // Valables en RGB linéaire, l'espace par défaut des filtres SVG.
  const matrices = {
    protanopie: `
    1.000,  0.000, 0.000, 0, 0
    0.479,  0.477, 0.044, 0, 0
    0.597, -0.689, 1.091, 0, 0
    0,      0,     0,     1, 0
  `,
    deuteranopie: `
    1.000,  0.000, 0.000, 0, 0
    0.163,  0.725, 0.112, 0, 0
    0.455, -0.645, 1.191, 0, 0
    0,      0,     0,     1, 0
  `,
    tritanopie: `
    0.741, -0.407, 0.666, 0, 0
    0.075,  0.585, 0.340, 0, 0
    0.000,  0.000, 1.000, 0, 0
    0,      0,     0,     1, 0
  `,
  };

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
                <feColorMatrix type="matrix" values="${matrices[profil]}"/>
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
