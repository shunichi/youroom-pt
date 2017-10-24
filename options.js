document.addEventListener("DOMContentLoaded", function(){
  var saveButton = document.querySelector('#save');
  saveButton.addEventListener('click', function(){
    var projectId = document.querySelector('#project_id').value;
    var apiToken = document.querySelector('#api_token').value;
    localStorage['projectId'] = projectId;
    localStorage['apiToken'] = apiToken;
   });
  
  var projectId = localStorage['projectId'];
  var apiToken = localStorage['apiToken'];
  if (projectId) {
    document.querySelector('#project_id').value = projectId;
  }
  if (apiToken) {
    document.querySelector('#api_token').value = apiToken;
  }
});
