'use strict';

var tabId = null;

chrome.storage.sync.get((config) => {
  function respondsWith200(url) {
    try {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( 'GET', url, false );
      xmlHttp.send( null );
      return xmlHttp.status === 200;
    } catch (e) {
      return false;
    }
  }

  function checkAddress() {
    if(respondsWith200(config.address)) {
      if(tabId != null) {
        chrome.tabs.remove(tabId);
        tabId = null;
      }
    }
    else if (tabId === null) {
      var tabOptions = {
        url: config.targetAddress,
        active: true
      };
      chrome.tabs.create(
        tabOptions,
        (tab) => tabId = tab.id
      );
    }
  }

  setInterval(checkAddress, 30000);
});
