var toolbarUI;

function initOverlay() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'toolbar');
  iframe.setAttribute('src', chrome.runtime.getURL('toolbar/ui.html'));
  iframe.setAttribute('style', 'position: absolute; top: 0; left: 0; z-index: 1000000; width: 100%; height: 100%;');
  document.body.appendChild(iframe);
  chrome.runtime.sendMessage({ name: 'overlay-initialized' });
  return toolbarUI = {
    iframe: iframe, visible: true
  };
}

function toggleOverlay(toolbarUI) {
  if (toolbarUI.visible) {
    toolbarUI.visible = false;
    toolbarUI.iframe.style['display'] = 'none';
  } else {
    toolbarUI.visible = true;
    toolbarUI.iframe.style['display'] = 'block';
  }
}

// Handle messages from the background page (only in top level iframes)
console.log('registering message listener');
chrome.runtime.onMessage.addListener((msg) => {
  if (window.parent == window) {
    console.log('message received');
    if (msg.name == 'toggle-in-page-toolbar') {
      if (toolbarUI) {
        toggleOverlay(toolbarUI);
      } else {
        toolbarUI = initOverlay();
      }
    }
  }
});

