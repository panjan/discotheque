'use strict';

function save_options() {
  let address = document.getElementById('watch').value;
  let targetAddress = document.getElementById('open').value;

  chrome.storage.sync.set({
    address: address,
    targetAddress: targetAddress
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved. Restart needed.';
    setTimeout(function() {
      status.value = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    address: 'http://foo.bar/baz',
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY'
  }, function(items) {
    document.getElementById('watch').value = items.address;
    document.getElementById('open').value = items.targetAddress;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener(
  'click',
  save_options
);
