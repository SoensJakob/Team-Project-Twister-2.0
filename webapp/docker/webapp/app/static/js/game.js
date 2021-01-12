'use strict'

const StartGameTimer = 5;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    MQTTconnect();
    Temp_WaitingScreen(StartGameTimer);
}