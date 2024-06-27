document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour récupérer et afficher les 5 derniers URL
    function displayInfos() {
        chrome.storage.local.get(['urlList'], function(result) {
            try {
                let urlCount = document.getElementById('urlCount');
                let last_url = document.getElementById('last_url');
                console.log('urlCount:', result.length);
                last_url.textContent = result.urlList.slice(-1)[0].slice(-10);
                urlCount.textContent = result.urlList.length;
            } catch (error) {
                console.error('Error while displaying last five URLs:', error);
            }
        });
    }

    displayInfos();

    // Ajouter un écouteur pour le bouton "Save Url"
    document.getElementById('url_button').addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            try {
                var currentUrl = tabs[0].url;
                chrome.storage.local.get(['urlList'], function(result) {
                    let urlList = result.urlList || [];
                    urlList.push(currentUrl);
                    chrome.storage.local.set({ urlList: urlList }, function() {
                        console.log('saved url : ', currentUrl);
                        displayInfos();
                    });
                });
            } catch (error) {
                console.error('Error while saving current URL:', error);
            }
        });
    });

    document.getElementById('compute').addEventListener('click', () => {
        console.log('Compute button clicked');
    
        chrome.storage.local.get('urlList', function(data) {
            const jsonData = JSON.stringify(data.urlList, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            chrome.downloads.download({
                url: url,
                filename: 'urlList.json',
                saveAs: true
            });
        });
    });    

    // Ajouter un écouteur pour l'image "settings"
    document.getElementById('settings').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'openSettings' });
    });
});