'use strict'

const StartGameTimer = 3;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    MQTTconnect();
    Temp_WaitingScreen(StartGameTimer);
}