chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openSettings') {
      chrome.windows.create({
        url: '../popups/settings.html',
        type: 'popup',
        width: 400,
        height: 400
      });
    }
});

// background.js

chrome.runtime.onInstalled.addListener(() => {
    // Vérifier si la liste existe déjà dans le storage
    chrome.storage.local.get(['urlList'], function(result) {
      if (!result.myList) {
        // Si la liste n'existe pas, l'initialiser avec une liste vide
        chrome.storage.local.set({ urlList: [] }, function() {
          console.log('Initialized empty url list');
        });
      }
    });
  });
  