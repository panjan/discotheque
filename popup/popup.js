'use strict';

function setToggleActiveText(isActive) {
  var newText = isActive ? 'Stop' : 'Start';
  document.getElementById('toggleActiveText').innerHTML = newText;
}

function toggleActive() {
  chrome.storage.local.get({ active: false }, (items) => {
    var newValue = !items.active;
    chrome.storage.local.set({ active: newValue });
    setToggleActiveText(newValue);
  });
}

function openOptions() {
  chrome.runtime.openOptionsPage();
}

function openGithub() {
  var createData = {
    url: 'https://github.com/panjan/discotheque'
  };
  chrome.tabs.create(createData);
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get({ active: false }, (items) => {
    setToggleActiveText(items.active);
  });
});

document.getElementById('toggleActive').addEventListener(
  'click',
  toggleActive
);

document.getElementById('options').addEventListener(
  'click',
  openOptions
);

document.getElementById('github').addEventListener(
  'click',
  openGithub
);
