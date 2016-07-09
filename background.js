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

function setNA(targetAddress) {
  chrome.browserAction.setBadgeText({ text: 'N/A' });
  chrome.browserAction.setBadgeBackgroundColor({ color: '#dd3f3a' });
  if (windowId === null) {
    openWindow(targetAddress);
  }
}

function setOK() {
  chrome.browserAction.setBadgeText({ text: 'OK' });
  chrome.browserAction.setBadgeBackgroundColor({ color: '#5cb85c' });
  if(windowId !== null) {
    chrome.windows.remove(windowId);
    windowId = null;
  }
}

function checkStatus(config) {
  var unavailableAddresses = [];
  for(var address of config.addresses) {
    if(!respondsWith200(address)) {
      unavailableAddresses.push(address);
    }
  }

  if(unavailableAddresses.length > 0) {
    setNA(config.targetAddress);
  }
  else {
    setOK();
  }
}

var interval = null;
function poll() {
  clearInterval(interval);
  chrome.storage.local.get({
    addresses: [],
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY',
    pollingInterval: 60
  },
                           (config) => {
                             if(config.addresses.length === 0) return;
                             checkStatus(config);
                             var intervalInSeconds = config.pollingInterval * 1000;
                             interval = setInterval(checkStatus, intervalInSeconds, config);
                           });
}

chrome.browserAction.onClicked.addListener(() => chrome.runtime.openOptionsPage());
poll();
