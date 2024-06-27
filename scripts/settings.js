document.getElementById('save').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const isEnabled = document.getElementById('toggle').checked;
  
    // Stockez ces valeurs dans le storage de Chrome
    chrome.storage.sync.set({
      email: email,
      isEnabled: isEnabled
    }, () => {
      console.log('Settings saved');
    });
});
  
// Charger les paramètres enregistrés
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['email', 'isEnabled'], (result) => {
    document.getElementById('email').value = result.email || '';
    document.getElementById('toggle').checked = result.isEnabled || false;
  });
});