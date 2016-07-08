'use strict';

function getAddressesFromInput() {
  var addressInputs = document.getElementsByName('address');
  var addressesArray = Array.prototype.slice.call(addressInputs);
  return addressesArray.map((input) => { return input.value; });
}

function save_options() {
  var addresses = getAddressesFromInput();
  var targetAddress = document.getElementById('open').value;
  var pollingInterval = document.getElementById('interval').value;

  chrome.storage.local.set({
    addresses: addresses,
    targetAddress: targetAddress,
    pollingInterval: pollingInterval
  }, function() {
      chrome.runtime.getBackgroundPage((background) => background.setActive(true));
      window.close();
  });
}

function addAddressInput() {
  var addressesContainer = document.getElementById('addresses');
  var addButton = document.getElementById('add');
  var inputElement = createAddressInputElement('');
  addressesContainer.insertBefore(inputElement, addButton);
}

function createAddressInputElement(address) {
  var input = document.createElement('input');
  input.setAttribute('name', 'address');
  input.setAttribute('type', 'url');
  input.value = address;
  var addressContainer = document.createElement('div');
  addressContainer.setAttribute('class', 'panel-formElements-item');
  addressContainer.appendChild(input);
  var removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.addEventListener('click', () => { addressContainer.remove(); });
  addressContainer.appendChild(removeButton);
  return addressContainer;
}

function createAddButtonElement() {
  var addButton = document.createElement('button');
  addButton.setAttribute('content', 'test content');
  addButton.innerHTML = 'Add';
  var addButtonContainer = document.createElement('div');
  addButtonContainer.setAttribute('id', 'add');
  addButtonContainer.setAttribute('class', 'panel-formElements-item');
  addButtonContainer.appendChild(addButton);
  addButtonContainer.addEventListener('click', addAddressInput);
  return addButtonContainer;
}

function restore_options() {
  chrome.storage.local.get({
    addresses: ['http://foo.bar/baz'],
    targetAddress: 'https://www.youtube.com/watch?v=wZZ7oFKsKzY',
    pollingInterval: 60
  }, function(items) {
    document.getElementById('open').value = items.targetAddress;
    document.getElementById('interval').value = items.pollingInterval;
    var addressesContainer = document.getElementById('addresses');
    for(var address of items.addresses) {
      var addressInput = createAddressInputElement(address);
      addressesContainer.appendChild(addressInput);
    }
    var addButtonContainer = createAddButtonElement();
    addressesContainer.appendChild(addButtonContainer);
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
