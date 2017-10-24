chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.name === 'postUrl') {
    var selection = document.getSelection();
    var selectedElem = selection.anchorNode.parentElement;
    var container = selectedElem.closest('.entry-container');
    if (container) {
      var a = container.querySelector('.entry-time a');
      if (a) {
        var href = a.getAttribute('href');
        if (href) {
          sendResponse("https://www.youroom.in" + href);
          return;
        }
      }
    } 
    else {
      var commentsContainer = selectedElem.closest('#cluetip');
      if (commentsContainer) {
        var input = commentsContainer.querySelector('input[name="parma_url"]');
        if (input) {
          sendResponse(input.value);
          return;
        }
      }
    }
    sendResponse(window.location.href);
  }
});