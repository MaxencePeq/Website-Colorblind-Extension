
// !!! TOUS LES COMMENTAIRES SONT ÉCRIS A LA MAIN, POUR M'AIDER A LA COMPRÉHENSION !!!
// ! AUCUNE IA N'A ÉTÉ UTILISÉ ICI.

const couleursDeBase = {
    links: '#0000ff',
    text: '#000000',
    background: '#ffffff'
};


document.addEventListener('DOMContentLoaded', function (){


    // La je récupère avec les IDs les color pickers
    const linkColorPicker = document.querySelector('#linkColor');
    const textColorPicker = document.querySelector('#textColor');
    const bgColorPicker = document.querySelector('#bgColor');
    const resetButton = document.querySelector('#backToBaseColor');

    // J'attends que le color pickers change de couleur
    linkColorPicker.addEventListener('change', function (){
        // le callback récupère la couleur
        const nouvelleCouleur = linkColorPicker.value;

        // Et içi j'utilise la fonction pour envoyer les infos au navigateur.
        envoyerMessage('links', nouvelleCouleur);
    })

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

        linkColorPicker.value = couleursDeBase.links;
        textColorPicker.value = couleursDeBase.text;
        bgColorPicker.value = couleursDeBase.background;

        envoyerMessage('links', couleursDeBase.links);
        envoyerMessage('text', couleursDeBase.text);
        envoyerMessage('background', couleursDeBase.background);
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