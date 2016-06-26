'use strict';

function save_options() {
  var address = document.getElementById('watch').value;
  var targetAddress = document.getElementById('open').value;
  var pollingInterval = document.getElementById('interval').value;

  chrome.storage.sync.set({
    address: address,
    targetAddress: targetAddress,
    pollingInterval: pollingInterval
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.value = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
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
