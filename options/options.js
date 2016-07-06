'use strict';

function save_options() {
  var address = document.getElementById('watch').value;
  var targetAddress = document.getElementById('open').value;
  var pollingInterval = document.getElementById('interval').value;

  chrome.storage.local.set({
    address: address,
    targetAddress: targetAddress,
    pollingInterval: pollingInterval
  }, function() {
      chrome.runtime.getBackgroundPage((background) => background.setActive(true));
      window.close();
  });
}

function restore_options() {
  chrome.storage.local.get({
    address: 'http://foo.bar/baz',
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY',
    pollingInterval: 60
  }, function(items) {
    document.getElementById('watch').value = items.address;
    document.getElementById('open').value = items.targetAddress;
    document.getElementById('interval').value = items.pollingInterval;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener(
  'click',
  save_options
);
document.getElementById('cancel').addEventListener(
  'click',
  () => window.close()
);
