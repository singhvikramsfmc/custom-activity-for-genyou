define([
    'postmonger'
], function (
    Postmonger
) {
    console.error( "POSTMONGER.JS ******** STARTED" );
   'use strict';
    var connection = new Postmonger.Session();
    var token;
    var payload = {};
    var contactKey;

    $(window).ready(function() {
        connection.trigger('requestTokens');
        connection.trigger('ready');
    });

    connection.on('clickedNext', save);

    connection.on('getTokens', function( data ) {
        if( data.error ) {
            console.error( data.error );
        } else {
            tokens = data;
        }
    });

    connection.on('initActivity', function(payload) {
        console.log("INITACTIVITY INITACTIVITY INITACTIVITY INITACTIVITY INITACTIVITY ");
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log("INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS ");
        console.log(inArguments);
        console.log("INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS INARGS ");

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                if (key === 'contactKey') {
                    contactKey = val;
                }
            });
        });
        console.log(payload);

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
        console.log("INITACTIVITY INITACTIVITY INITACTIVITY INITACTIVITY INITACTIVITY ");
     });



    connection.on('requestedTokens', function(tokens) {
        token = tokens;
    });

       function save() {
        payload['arguments'].execute.inArguments = [{
            "tokens": token,
            "contactKey": contactKey
        }];

        payload['metaData'].isConfigured = true;

        console.log(payload);
        connection.trigger('updateActivity', payload);
    }
});
