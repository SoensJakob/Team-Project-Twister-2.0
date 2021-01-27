'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    serverUrl = document.querySelector('#mqttip').innerHTML;
    topic = "/twisterspeaker";
    init();
});

const init = function(){
    MQTTconnect();
    Temp_SelectGameOptions();
}