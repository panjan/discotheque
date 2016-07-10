// var port = chrome.runtime.connect();

// document.querySelector("#toggle").addEventListener("click", function() {
//   port.postMessage("toggle-in-page-toolbar");
// });

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.name == 'overlay-errors') {
    console.log(document);
    var errorsContainer = document.getElementById('errors');
    for(var error of msg.errors) {
      var errorElement = document.createElement('div');
      errorElement.innerHTML = error;
      errorsContainer.appendChild(errorElement);
    }
  }
});
