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

function setActive(newValue) {
  chrome.storage.local.set({ active: newValue }, () => {
    if(newValue) {
      poll();
    } else {
      clearInterval(interval);
      chrome.browserAction.setBadgeText({ text: '' });
    }
  });
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

var interval = null;
function poll() {
  clearInterval(interval);
  chrome.storage.local.get({
    address: 'http://foo.bar/baz',
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY',
    pollingInterval: 60,
    active: false
  },
                           (config) => {
                             if(!config.active) return;
                             checkStatus(config);
                             var intervalInSeconds = config.pollingInterval * 1000;
                             interval = setInterval(checkStatus, intervalInSeconds, config);
                           });
}

poll();
