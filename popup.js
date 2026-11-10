// Le popup ne fait qu'enregistrer le profil : content.js l'applique tout seul sur les pages.

// À l'ouverture : on coche le profil déjà enregistré.
chrome.storage.local.get('profil', function (data) {
    const profil = data.profil || 'aucun';
    document.querySelector(`input[value="${profil}"]`).checked = true;
});

// Dès qu'on coche un profil : on l'enregistre.
document.querySelectorAll('input[name="daltonisme"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        chrome.storage.local.set({ profil: radio.value });
    });
});
