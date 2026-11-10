// Le popup ne fait qu'enregistrer les réglages : content.js les applique tout seul sur les pages.

const curseur = document.getElementById('intensite');
const affichageIntensite = document.getElementById('intensiteValeur');

function afficherIntensite() {
    affichageIntensite.textContent = curseur.value + ' %';
}

// À l'ouverture : on coche le profil et on place le curseur selon les réglages enregistrés.
chrome.storage.local.get(['profil', 'intensite'], function (data) {
    const profil = data.profil || 'aucun';
    document.querySelector(`input[value="${profil}"]`).checked = true;
    curseur.value = data.intensite ?? 100;
    afficherIntensite();
});

// Dès qu'on coche un profil : on l'enregistre.
document.querySelectorAll('input[name="daltonisme"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        chrome.storage.local.set({ profil: radio.value });
    });
});

// Le pourcentage suit le curseur en direct, mais on n'enregistre qu'au relâchement.
curseur.addEventListener('input', afficherIntensite);
curseur.addEventListener('change', function () {
    chrome.storage.local.set({ intensite: Number(curseur.value) });
});
