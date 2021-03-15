
  define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';


var h = {
  "lst_nm": "Wagner",
  "first_nm": "Michelle",
  "policy_nbr": "76414020",
  "subscriber_id":"21087072",
  "dob": "1972-06-22",
  "user_id": "vsing174",
  "user_type": "Applications",
  "calling_app_name": "UMR_SalesForce"
  }
  


var connection = new Postmonger.Session();

//connection.trigger('initActivity',{"id":1 , "name":"Mike"});

connection.trigger('ready');
const https = require('https');

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
connection.on('initActivity',function(data){
  fetch('https://gateway-stage-dmz.optum.com/auth/oauth2/cached/token?client_id=MNpfyNCDugOdYNvErQZfOtCkYzhLbsoA&client_secret=2AuAXl1oxQVDLvXJsLRHx6uN9vBf9OL4&grant_type=client_credentials',{
        method : 'POST',
       
        agent:httpsAgent
        
    })
    .then( response => response.json() )
   .then( data => 
    fetch('https://gateway-stage-dmz.optum.com/api/stage/cel/optumisl/epmp/v1.5/preferences',
    {
      method : 'POST',
     headers :{ Authorization:'Bearer '+data.access_token },
      agent : httpsAgent,
      body : JSON.stringify(h)
      
  }
   )) .then( response2 => response2.json() )
   .then( data2 => console.log(data2));
  })


connection.on('clickedNext',function(){
 var configuration = JSON.parse(document.getElementById('configuration').value);
 connection.trigger('updateActivity',configuration)});
 
});
