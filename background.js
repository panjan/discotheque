'use strict';

var windowId = null;

function respondsWith200(url) {
  try {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, false);
    xmlHttp.send(null);
    return xmlHttp.status === 200 || xmlHttp.status === 204;
  } catch (e) {
    return false;
  }
}

function openWindow(targetAddress) {
  var createData = {
    url: targetAddress,
    focused: true,
    type: 'popup'
  };
  chrome.windows.create(
    createData,
    (window) => windowId = window.id
  );
}

function poll() {
  chrome.storage.local.get({
    address: 'http://foo.bar/baz',
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY',
    active: false
  },
                           (config) => checkStatus(config));
}

function checkStatus(config) {
  if(!config.active) return;
  if(respondsWith200(config.address)) {
    chrome.browserAction.setBadgeText({ text: 'OK' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#5cb85c' });
    if(windowId !== null) {
      chrome.windows.remove(windowId);
      windowId = null;
    }
  }
  else {
    chrome.browserAction.setBadgeText({ text: 'N/A' });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#dd3f3a' });
    if (windowId === null) {
      openWindow(config.targetAddress);
    }
  }
}

chrome.storage.local.get({ pollingInterval: 60 },
                         (config) => {
                           setInterval(poll, config.pollingInterval * 1000);
                         });
