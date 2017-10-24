function saveToClipboard(str) {
  var textArea = document.createElement("textarea");
  textArea.style.cssText = "position:absolute;left:-100%";

  document.body.appendChild(textArea);

  textArea.value = str;
  textArea.select();
  document.execCommand("copy");

  document.body.removeChild(textArea);
}

function handleStateChange() {
  var READYSTATE_COMPLETED = 4;
  var HTTP_STATUS_OK = 200;

  if( this.readyState == READYSTATE_COMPLETED
   && this.status == HTTP_STATUS_OK )
  {
    response = JSON.parse(this.responseText);
    saveToClipboard(response.url);
  }
}

function createPivotalStory(name, description) {
  var projectId = localStorage['projectId'];
  var apiToken = localStorage['apiToken'];
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = handleStateChange;
  xhr.open("POST", "https://www.pivotaltracker.com/services/v5/projects/" + projectId + "/stories", true);
  xhr.setRequestHeader("X-TrackerToken", apiToken);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({name: name, description: description}));  
}

function onSelectionMenu(info, tab) {
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
  // console.log("selection:" + info.selectionText);
  // console.log("pageUrl:" + info.pageUrl);

  chrome.tabs.sendMessage(tab.id, {name: 'postUrl'}, function(response){
    createPivotalStory(info.selectionText, response);
  })
}

var id = chrome.contextMenus.create({
  "title": "To PivotalTracker Story",
  "contexts":["selection"],
  "onclick": onSelectionMenu
});
