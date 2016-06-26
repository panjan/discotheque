'use strict';

var windowId = null;

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

function openWindow(targetAddress) {
  var createData = {
    url: targetAddress,
    focused: true
  };
  chrome.windows.create(
    createData,
    (window) => windowId = window.id
  );
}

function poll() {
  chrome.storage.sync.get({
    address: 'http://foo.bar/baz',
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY'
  },
                          (config) => checkStatus(config));
}

function checkStatus(config) {
  if(respondsWith200(config.address)) {
    if(windowId !== null) {
      chrome.windows.remove(windowId);
      windowId = null;
    }
  }
  else if (windowId === null) {
    openWindow(config.targetAddress);
  }
}

chrome.storage.sync.get({ pollingInterval: 60 },
                        (config) => {
                          setInterval(poll, config.pollingInterval * 1000);
                        });
