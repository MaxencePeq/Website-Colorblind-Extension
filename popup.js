
// !!! TOUS LES COMMENTAIRES SONT ÉCRIS A LA MAIN, POUR M'AIDER A LA COMPRÉHENSION !!!
// ! AUCUNE IA N'A ÉTÉ UTILISÉ ICI.

document.addEventListener('DOMContentLoaded', function (){

    // Initialisation du thème
    const textColor = "";
    const linkColor = "";
    const backgroundColor = "";

    // J'attends l'appuis du bouton valider
    const validation = document.querySelector('#btnValider');
    validation.addEventListener('click', function(){
        // Je cherche l'input qui a le nom "typeDaltonisme" ET qui est coché (:checked)
        const radioCoche = document.querySelector('input[name="typeDaltonisme"]:checked');
        switch (radioCoche){
            case "protanopie" :
            case "deuteranopie" :
            case "tritanopie" :
        }
    });


    // envoyerMessage('links', nouvelleCouleur);

    textColorPicker.addEventListener('change', function(){

        const nouvelleCouleur = textColorPicker.value;
        envoyerMessage('text', nouvelleCouleur)
    })

    bgColorPicker.addEventListener('change', function (){
        const nouvelleCouleur = bgColorPicker.value;
        envoyerMessage('background', nouvelleCouleur)
    })

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