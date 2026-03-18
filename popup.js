
// !!! TOUS LES COMMENTAIRES SONT ÉCRIS A LA MAIN, POUR M'AIDER A LA COMPRÉHENSION !!!
// ! AUCUNE IA N'A ÉTÉ UTILISÉ ICI.

document.addEventListener('DOMContentLoaded', function (){

    // Initialisation du thème
    let textColor = "";
    let linkColor = "";
    let backgroundColor = "";

    // J'attends l'appuis du bouton valider
    const validation = document.querySelector('#btnValider');
    validation.addEventListener('click', function(){
        // Je cherche l'input qui a le nom "typeDaltonisme" ET qui est coché (:checked)

        const radioCoche = document.querySelector('input[name="daltonisme"]:checked');

        switch (radioCoche.value){
            case "protanopie" :
                textColor = "#000080";
                linkColor = "#ff7f00";
                backgroundColor = "#f5f5f5";
                break;
            case "deuteranopie" :
                backgroundColor = "#ffffff";
                linkColor = "#ff0000";
                textColor = "#000000"
                break;
            case "tritanopie" :
                backgroundColor = "#ffffff";
                textColor = "#000000"
                linkColor = "#ff0000"
                break;
        }

        envoyerMessage('links', linkColor);
        envoyerMessage('background', backgroundColor);
        envoyerMessage('text', textColor);

    });


    // envoyerMessage('links', nouvelleCouleur);

    const resetButton = document.querySelector('#backToBaseColor')
    // Quand on clique sur le bouton de reset
    resetButton.addEventListener('click', function(){

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.reload(tabs[0].id);
        });

        location.reload();
    })

})

function envoyerMessage(type, couleur) {
    // Je récupère l'onglet actif
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

        // J'envoie un message à cet onglet
        chrome.tabs.sendMessage(
            tabs[0].id,  // Ça, c'est le premier onglet trouvé
            {
                type: type,      // le donne le type a modifier
                color: couleur   // et la couleur
            }
        );
    })}