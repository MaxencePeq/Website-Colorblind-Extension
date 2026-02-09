// Écoute les messages venant de popup.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    if (message.type === 'links'){
        // je récupère tous les liens avec le querySelectorAll
        const liens = document.querySelectorAll('a');

        // Je boucle dans les liens
        liens.forEach(function (lien){

            //dans le callback, je récupère la couleur
            lien.style.color = message.color;
        })
    }

    if(message.type === 'text'){
        const element = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, label, span, a, li, input, textarea, button');
        element.forEach(elementTexte => {
            element.style.color = message.color;
        })
    }
    if(message.type === 'background'){
        // J'applique sur body
        document.body.style.backgroundColor = message.color;

        // je trouve tous les éléments qui ont un background-color défini
        const tousLesElements = document.querySelectorAll('*');

        tousLesElements.forEach(element => {
            const bgColor = getComputedStyle(element).backgroundColor;

            // Si mon élément a un background différent de transparent, j'applique la couleur
            if(bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                element.style.backgroundColor = message.color;
            }
        });
    }
})