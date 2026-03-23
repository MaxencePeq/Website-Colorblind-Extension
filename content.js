// matrices de correction
const matrices = {
    protanopie: `
        0.567, 0.433, 0,     0, 0
        0.558, 0.442, 0,     0, 0
        0,     0.242, 0.758, 0, 0
        0,     0,     0,     1, 0
    `,
    deuteranopie: `
        0.625, 0.375, 0,   0, 0
        0.7,   0.3,   0,   0, 0
        0,     0.3,   0.7, 0, 0
        0,     0,     0,   1, 0
    `,
    tritanopie: `
        0.95, 0.05,  0,     0, 0
        0,    0.433, 0.567, 0, 0
        0,    0.475, 0.525, 0, 0
        0,    0,     0,     1, 0
    `
};

chrome.runtime.onMessage.addListener(function (message) {

    function appliquerFiltre(profil) {

        // On crée un SVG invisible avec le filtre dedans
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style = 'position:absolute; width:0; height:0; overflow:hidden;';
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
        document.documentElement.style.filter = 'url(#daltonisme-filter)';
    }


    // Récupération du message et application du filtre.
    if (message.type === 'appliquerProfil') {
        appliquerFiltre(message.profil);
    }

    /** Application des modifications personnalisées **/
    if (message.type === 'links') {
        const liens = document.querySelectorAll('a');
        liens.forEach(function (lien) {
            lien.style.setProperty('color', message.color, 'important');
        });
    }

    if (message.type === 'text') {
        const elements = document.querySelectorAll('*');
        elements.forEach(function (element) {
            if (element.tagName !== 'A') {
                element.style.setProperty('color', message.color, 'important');
            }
        });
    }

    if (message.type === 'background') {
        const elements = document.querySelectorAll('*');
        elements.forEach(function (element) {
            const bgColor = getComputedStyle(element).backgroundColor;
            if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                element.style.setProperty('background-color', message.color, 'important');
            }
        });
        document.body.style.setProperty('background-color', message.color, 'important');
    }
});
