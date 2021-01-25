'use strict'

const StartGameTimer = 3;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    serverUrl = document.querySelector('#mqttip').innerHTML;
    init();
});

const init = function(){
    MQTTconnect();
    Temp_WaitingScreen(StartGameTimer);
}