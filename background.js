'use strict';

let address = 'http://localhost:4567/hi';
let target_address = 'https://www.youtube.com/watch?v=wZZ7oFKsKzY';
let tab_options = {
  url: target_address,
  active: true
};

var tabId = null;

function setTabId(tab){
  tabId = tab.id;
}

function respondsWith200(theUrl) {
  try {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.status === 200;
  } catch (e) {
    return false;
  }
}

function checkAddress() {
  if(respondsWith200(address)) {
    chrome.tabs.remove(tabId);
    tabId = null;
  }
  else if (tabId === null) {
    chrome.tabs.create(
      tab_options,
      setTabId
    );
  }
}

setInterval(checkAddress, 30000);
