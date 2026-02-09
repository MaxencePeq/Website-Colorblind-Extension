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
        document.body.style.color = message.color;
    }
    if(message.type === 'background'){
        document.body.style.backgroundColor = message.color;
    }
})