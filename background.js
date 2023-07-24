// background.js

chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    files: ['content.js']
  });
  chrome.scripting.insertCSS({
    target: { tabId: details.tabId },
    files: ['styles.css']
  });
}, { url: [{ urlPrefix: 'https://twitter.com/' }, { urlPrefix: 'https://m.twitter.com/' }, { urlPrefix: 'https://x.com/' }] });
