document.addEventListener('DOMContentLoaded', function () {

    /** --- Application du profil daltonisme --- **/
    const validation = document.querySelector('#btnValider');
    validation.addEventListener('click', function () {

        const radioCoche = document.querySelector('input[name="daltonisme"]:checked');
        envoyerMessage({ type: 'appliquerProfil', profil: radioCoche.value });
    });

    /** --- Modifications manuelles des couleurs --- **/
    const linkColorPicker = document.querySelector('#specialLinkColor');
    const textColorPicker = document.querySelector('#specialTextColor');
    const bgColorPicker   = document.querySelector('#specialBgColor');

    document.querySelector('#linkValider').addEventListener('click', function () {
        envoyerMessage({ type: 'links', color: linkColorPicker.value });
    });

    document.querySelector('#textValider').addEventListener('click', function () {
        envoyerMessage({ type: 'text', color: textColorPicker.value });
    });

    document.querySelector('#bgValider').addEventListener('click', function () {
        envoyerMessage({ type: 'background', color: bgColorPicker.value });
    });

    /** --- Réinitialisation --- **/
    document.querySelector('#backToBaseColor').addEventListener('click', function () {
        // On envoie le message de reset, plus besoin de reload
        envoyerMessage({ type: 'reset' });
    });

});

function envoyerMessage(data) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data);
    });
}
