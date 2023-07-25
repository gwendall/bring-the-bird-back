// content.js

// Function to replace text when element is found
async function replaceLogo() {

  // Get the URL of the SVG file
  const svgURL = chrome.runtime.getURL("bird.svg");

  // Fetch the SVG
  const response = await fetch(svgURL);
  const logoText = await response.text();

  // Parse SVG string to Node
  const parser = new DOMParser();
  const logo = parser.parseFromString(logoText, "image/svg+xml").documentElement;
  logo.setAttribute('width', "24");
  logo.setAttribute('height', "24");

  // Replace the logo
  const element = document.querySelector('header a[aria-label="Twitter"]');
  if (element) {
    element.innerHTML = logo.outerHTML;
  }

  const elementToReplace = document.querySelector('svg[aria-label="Twitter"]');
  if (elementToReplace) {
    const logoClone = logo.cloneNode(true); // Clone the Node as we can't use the same Node twice
    elementToReplace.parentNode.replaceChild(logoClone, elementToReplace);
  }

  const elementToReplace2 = document.querySelector('main > div > div > div > div > div > svg');
  if (elementToReplace2) {
    const logoClone = logo.cloneNode(true); // Clone the Node as we can't use the same Node twice
    elementToReplace2.parentNode.replaceChild(logoClone, elementToReplace2);
  }
  
}

function replaceFavicon() {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = chrome.runtime.getURL("favicon.ico");  // replace with the path to your favicon
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  // Look through all mutations that just occured
  for (const mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    for (const node of mutation.addedNodes) {
      // Checks if the added node has the targeted element
      if (
        node.querySelector &&
        (
          node.querySelector('header a[aria-label="Twitter"]') ||
          node.querySelector('svg[aria-label="Twitter"]') ||
          node.querySelector('main > div > div > div > div > div > svg')
        )
      ) {
        replaceLogo();
        break;  // If the targeted element is found, stop the loop to prevent unnecessary checks
      }
    }
  }
};

// Create a new observer
const observer = new MutationObserver(callback);

// Start observing the document with the configured parameters
observer.observe(document.body, config);
replaceFavicon();
