define([
    'postmonger'
], function (
    Postmonger
) {
   'use strict';
    var connection = new Postmonger.Session();
    var token;
    var payload = {};
    var contactKey;

    $(window).ready(function() {
        connection.trigger('requestTokens');
        connection.trigger('ready');
    });

connection.trigger('ready');
connection.on('initActivity',function(data){
  document.getElementByID('configuration').value = JSON.stringify(data,null,2);
});

connection.on('clickedNext',function(){
  var configuration = JSON.parse(document.getElementByID('configuration').value);
  connection.trigger('updateActivity',configuration);
});

});
