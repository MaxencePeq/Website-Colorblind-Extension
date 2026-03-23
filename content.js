chrome.runtime.onMessage.addListener(function (message) {


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
