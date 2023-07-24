// content.js
console.log('Mutation Observer started !!!');

// Function to replace text when element is found
async function replaceLogo() {
  // Select all elements based on the CSS selector
  let element = document.querySelector('header a[aria-label="Twitter"]');

  if (element) {
    // Get the URL of the SVG file
    let svgURL = chrome.runtime.getURL("bird.svg");

    // Fetch the SVG
    let response = await fetch(svgURL);
    let data = await response.text();

    element.innerHTML = data;
  }
}

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  // Look through all mutations that just occured
  for(let mutation of mutationsList) {
    // If the addedNodes property has one or more nodes
    for(let node of mutation.addedNodes) {
      // Checks if the added node has the targeted element
      if(node.querySelector && node.querySelector('header a[aria-label="Twitter"]')) {
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
