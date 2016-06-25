'use strict';

var windowId = null;

chrome.storage.sync.get((config) => {
  function respondsWith200(url) {
    try {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', url, false);
      xmlHttp.send(null);
      return xmlHttp.status === 200;
    } catch (e) {
      return false;
    }
  }

  function openWindow() {
    var createData = {
      url: config.targetAddress,
      focused: true
    };
    chrome.windows.create(
      createData,
      (window) => windowId = window.id
    );
  }

  function checkAddress() {
    if(respondsWith200(config.address)) {
      if(windowId != null) {
        chrome.windows.remove(windowId);
        windowId = null;
      }
    }
    else if (windowId === null) {
      openWindow();
    }
  }

  var intervalInSeconds = config.pollingInterval || 60;
  setInterval(checkAddress, intervalInSeconds * 1000);
});
