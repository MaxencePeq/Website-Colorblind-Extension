
// !!! TOUS LES COMMENTAIRES SONT ÉCRIS A LA MAIN, POUR M'AIDER A LA COMPRÉHENSION !!!
// ! AUCUNE IA N'A ÉTÉ UTILISÉ ICI.

document.addEventListener('DOMContentLoaded', function (){

    // Initialisation du thème
    let textColor = "";
    let linkColor = "";
    let backgroundColor = "";

    /** --- Modification du thème **/
    // J'attends l'appuis du bouton valider
    const validation = document.querySelector('#btnValider');
    validation.addEventListener('click', function(){
        // Je cherche l'input qui a le nom "typeDaltonisme" ET qui est coché (:checked)

        const radioCoche = document.querySelector('input[name="daltonisme"]:checked');

        // le switch évite les if, elseif, else...
        switch (radioCoche.value) {
            case "protanopie":
                // Difficulté avec le rouge.
                // Solution : Le fond gris clair et texte bleu marine donnent un contraste pur.
                // Le lien orange vif (#ff7f00) contient beaucoup de jaune, qu'ils voient très bien.
                backgroundColor = "#f5f5f5"; // Gris très clair
                textColor = "#000080";       // Bleu marine
                linkColor = "#ff7f00";       // Orange vif
                break;

            case "deuteranopie":
                // Difficulté avec le vert. Les rouges paraissent marron/ternes.
                // Solution : Le Bleu est la couleur "refuge" absolue pour eux.
                // On utilise le "Bleu Okabe-Ito" (#0072B2) pour les liens, qui est extrêmement visible et percutant pour eux.
                backgroundColor = "#fafafa"; // Blanc cassé
                textColor = "#1a1a1a";       // Noir / Gris très sombre
                linkColor = "#0072b2";       // Bleu fort et accessible
                break;

            case "tritanopie":
                // Difficulté avec le bleu (confondu avec le vert) et le jaune (confondu avec le rose).
                // Solution : On supprime le bleu des liens ! On utilise un Rouge très fort ou un Rouge-Bordeaux.
                // Comme leur vision du rouge/vert est intacte, un lien rouge vif est parfait pour eux.
                backgroundColor = "#ffffff"; // Blanc pur
                textColor = "#333333";       // Gris sombre
                linkColor = "#b30000";       //  Rouge plus sombre
                break;
        }


        envoyerMessage('links', linkColor);
        envoyerMessage('background', backgroundColor);
        envoyerMessage('text', textColor);

    });

    /** --- Fin de la modification du thème **/






    /** --- Modification manuelle **/

    // Je récupère avec les BONS IDs de mon HTML
    const linkColorPicker = document.querySelector('#specialLinkColor');
    const textColorPicker = document.querySelector('#specialTextColor');
    const bgColorPicker = document.querySelector('#specialBgColor');

    const BoutonLink = document.querySelector('#linkValider');
    const boutonText = document.querySelector('#textValider');
    const BoutonBg = document.querySelector('#bgValider');

    BoutonLink.addEventListener('click', function(){
        envoyerMessage('links', linkColorPicker.value);
    });

    boutonText.addEventListener('click', function(){
        envoyerMessage('text', textColorPicker.value);
    });

    BoutonBg.addEventListener('click', function(){
        envoyerMessage('background', bgColorPicker.value);
    });



    /** --- Fonction et bouton de fin de page --- **/

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