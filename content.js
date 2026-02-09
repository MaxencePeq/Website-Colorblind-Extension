chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    document.body.style.backgroundColor = request.color;
});
